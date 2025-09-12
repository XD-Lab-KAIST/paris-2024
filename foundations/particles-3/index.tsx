import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF , Stars} from "@react-three/drei";

import useMousePos from "@/utils/hooks/useMousePos";

import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";


// Import shaders
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";
import gpgpuParticlesShader from "./shaders/gpgpu/particles.glsl";

//useResize
import useResize from "@/utils/hooks/useResize";

const SCALE = 3.95;
const PARTICLE_COUNT = 150000;

// Extend useThree with OrbitControls
extend({ OrbitControls });

export default function GPGPUParticles() {
  const [windowWidth, windowHeight] = useResize();
  const mousePos = useMousePos();

  const { gl, scene, camera, size } = useThree();
  const [gpgpu, setGpgpu] = useState<any>(null);

  const baseGeometryRef = useRef<any>();
  const particlesRef = useRef();
  const raycastMeshRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const ndcRef = useRef<THREE.Vector2>(new THREE.Vector2());

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  // Track mouse relative to the canvas, convert to NDC
  useEffect(() => {
    const el = gl.domElement as HTMLCanvasElement;
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      ndcRef.current.set(x, y);
    };
    el.addEventListener('pointermove', handleMove);
    return () => el.removeEventListener('pointermove', handleMove);
  }, [gl]);

  useEffect(() => {
    if (!gltf) return;

    const baseGeometry: any = {};
    const originalMesh = gltf.scene.children[0] as THREE.Mesh;
    const originalGeometry = originalMesh.geometry;

    // Create invisible mesh for precise raycasting on the actual surface (scaled)
    const rayMesh = new THREE.Mesh(originalGeometry, new THREE.MeshBasicMaterial({ visible: false }));
    rayMesh.scale.set(SCALE, SCALE, SCALE);
    rayMesh.visible = false;
    scene.add(rayMesh);
    raycastMeshRef.current = rayMesh;

    // --- Sample a higher density of points for the particles ---
    const sampler = new MeshSurfaceSampler(originalMesh).build();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const _position = new THREE.Vector3();
    const _color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sampler.sample(_position, undefined, _color);
      positions.set([_position.x, _position.y, _position.z], i * 3);
      colors.set([_color.r, _color.g, _color.b], i * 3);
    }
    // --- End sampling ---

    baseGeometry.count = PARTICLE_COUNT;
    baseGeometry.positions = positions;
    baseGeometry.colors = colors;
    baseGeometryRef.current = baseGeometry;

    // Initialize GPUComputationRenderer
    const gpgpu: any = {};
    gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count));

    gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, gl);

    const baseParticlesTexture = gpgpu.computation.createTexture();

    for (let i = 0; i < baseGeometry.count; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Position based on geometry
      baseParticlesTexture.image.data[i4 + 0] = baseGeometry.positions[i3 + 0] * SCALE;
      baseParticlesTexture.image.data[i4 + 1] = baseGeometry.positions[i3 + 1] * SCALE;
      baseParticlesTexture.image.data[i4 + 2] = baseGeometry.positions[i3 + 2] * SCALE;
      baseParticlesTexture.image.data[i4 + 3] = Math.random() * 10;
    }

    // Particles variable
    gpgpu.particlesVariable = gpgpu.computation.addVariable("uParticles", gpgpuParticlesShader, baseParticlesTexture);
    gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable]);

    // Uniforms
    gpgpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0);
    gpgpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0);
    gpgpu.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.5);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(10.0);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(2.0);
    gpgpu.particlesVariable.material.uniforms.uModelCursors = { value: Array.from({ length: 8 }, () => new THREE.Vector3()) } as any;
    gpgpu.particlesVariable.material.uniforms.uCursorCount = { value: 0 } as any;
    gpgpu.particlesVariable.material.uniforms.uCursorForceStrength = new THREE.Uniform(18.0);

    gpgpu.computation.init();

    setGpgpu(gpgpu);

    return () => {
      if (raycastMeshRef.current) {
        scene.remove(raycastMeshRef.current);
        raycastMeshRef.current = null;
      }
    };
  }, []);

  const { geometry, material } = useMemo(() => {
    const baseGeometry: any = baseGeometryRef.current;
    if (!baseGeometry)
      return {
        geometry: null,
        material: null,
      };

    const particlesUvArray = new Float32Array(baseGeometry.count * 2);
    const sizesArray = new Float32Array(baseGeometry.count);

    for (let y = 0; y < gpgpu.size; y++) {
      for (let x = 0; x < gpgpu.size; x++) {
        const i = y * gpgpu.size + x;
        const i2 = i * 2;

        // UV
        const uvX = (x + 0.5) / gpgpu.size;
        const uvY = (y + 0.5) / gpgpu.size;

        particlesUvArray[i2] = uvX;
        particlesUvArray[i2 + 1] = uvY;

        // Size
        sizesArray[i] = Math.random();
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setDrawRange(0, baseGeometry.count);
    geometry.setAttribute("position", new THREE.BufferAttribute(baseGeometry.positions, 3));
    geometry.setAttribute("aParticlesUv", new THREE.BufferAttribute(particlesUvArray, 2));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(baseGeometry.colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(0.018),
        uResolution: new THREE.Uniform(new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())),
        uParticlesTexture: new THREE.Uniform(0),
        uTime: new THREE.Uniform(0),
      },
    });

    return { geometry, material };
  }, [gpgpu, particlesVertexShader, particlesFragmentShader, size, gl]);

  /**
   * Animation
   */

  const [startingTimeRecorded, setStartingTimeRecorded] = useState(false);
  let startingTimeRef = useRef(0);
  let previousTimeRef = useRef(0);
  const tmpVec = useRef(new THREE.Vector3());

  //get the starting time

  useFrame((state, delta) => {
    if (!startingTimeRecorded) {
      startingTimeRef.current = state.clock.getElapsedTime();
      setStartingTimeRecorded(true);
    }
    const elapsedTime = state.clock.getElapsedTime() - startingTimeRef.current;
    const deltaTime = elapsedTime - previousTimeRef.current;
    previousTimeRef.current = elapsedTime;

    // GPGPU Update
    if (!gpgpu) return;
    gpgpu.particlesVariable.material.uniforms.uTime.value = elapsedTime;
    gpgpu.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime;

    const ndc = ndcRef.current;
    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(ndc as any, camera);

    const maxCursors = 8;
    let count = 0;
    if (raycastMeshRef.current) {
      const intersects = raycaster.intersectObject(raycastMeshRef.current, true);
      if (intersects.length > 0) {
        (gpgpu.particlesVariable.material.uniforms.uModelCursors.value[0] as THREE.Vector3).copy(intersects[0].point);
        count = 1;
      }
    }
    if (count === 0) {
      const origin = raycaster.ray.origin;
      const dir = raycaster.ray.direction.clone();
      const center = new THREE.Vector3(0, 0, 0);
      const t = origin.distanceTo(center);
      (gpgpu.particlesVariable.material.uniforms.uModelCursors.value[0] as THREE.Vector3).copy(origin.clone().add(dir.multiplyScalar(t)));
      count = 1;
    }
    gpgpu.particlesVariable.material.uniforms.uCursorCount.value = count;

    // Also provide screen-space cursor to mimic particles-1 immediacy
    if (!gpgpu.particlesVariable.material.uniforms.uScreenCursor) {
      gpgpu.particlesVariable.material.uniforms.uScreenCursor = new THREE.Uniform(new THREE.Vector2());
    }
    const screenCursor = gpgpu.particlesVariable.material.uniforms.uScreenCursor.value as THREE.Vector2;
    screenCursor.set((ndc.x + 1) * 0.5, (ndc.y + 1) * 0.5);

    gpgpu.computation.compute();

    if (!material) return;
    material.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture;
    material.uniforms.uTime.value = elapsedTime;
  });

  return (
    <>
    <Stars 
    factor={1}
    //size
    size={10}
    />
      <OrbitControls />
      {geometry && material && <points args={[geometry, material]} />}
    </>
  );
}
