import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import useMousePos from "@/utils/hooks/useMousePos";

import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import * as THREE from "three";

import * as S from "./styles";

// Import shaders
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";
import gpgpuParticlesShader from "./shaders/gpgpu/particles.glsl";

//useResize
import useResize from "@/utils/hooks/useResize";

const PIXEL_RATIO = 2;

// Extend useThree with OrbitControls
extend({ OrbitControls });

function GPGPUParticles() {
  const [windowWidth, windowHeight] = useResize();
  const mousePos = useMousePos();

  const { gl, scene, camera, size } = useThree();
  const [gpgpu, setGpgpu] = useState<any>(null);

  const baseGeometryRef = useRef();
  const particlesRef = useRef();

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  useEffect(() => {
    if (!gltf) return;

    const baseGeometry: any = {};

    //scale up
    baseGeometry.instance = gltf.scene.children[0]?.geometry;
    baseGeometry.count = baseGeometry.instance.attributes.position.count;

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
      baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0];
      baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1];
      baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2];
      baseParticlesTexture.image.data[i4 + 3] = Math.random();
    }

    // Particles variable
    gpgpu.particlesVariable = gpgpu.computation.addVariable("uParticles", gpgpuParticlesShader, baseParticlesTexture);
    gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable]);

    // Uniforms
    gpgpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0);
    gpgpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0);
    gpgpu.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.5);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(2.0);
    gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.5);
    gpgpu.particlesVariable.material.uniforms.uModelCursor = new THREE.Uniform(new THREE.Vector3());
    gpgpu.particlesVariable.material.uniforms.uDisplacementIntensity = new THREE.Uniform(0.5);

    gpgpu.computation.init();

    setGpgpu(gpgpu);
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
    geometry.setAttribute("position", baseGeometry.instance.attributes.position);
    geometry.setAttribute("aParticlesUv", new THREE.BufferAttribute(particlesUvArray, 2));
    geometry.setAttribute("aColor", baseGeometry.instance.attributes.color);
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(0.005),
        uResolution: new THREE.Uniform(new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())),
        uParticlesTexture: new THREE.Uniform(),
      },
    });

    return { geometry, material };
  }, [gpgpu, particlesVertexShader, particlesFragmentShader, size, gl]);

  /**
   * Animation
   */

  let previousTimeRef = useRef(0);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime() * 10;
    const deltaTime = elapsedTime - previousTimeRef.current;
    previousTimeRef.current = elapsedTime;

    // GPGPU Update
    if (!gpgpu) return;
    gpgpu.particlesVariable.material.uniforms.uTime.value = elapsedTime;
    gpgpu.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime;
    gpgpu.particlesVariable.material.uniforms.uModelCursor = new THREE.Uniform(new THREE.Vector3(mousePos.x, mousePos.y, 0));
    gpgpu.computation.compute();

    if (!material) return;
    material.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture;
  });

  return <>{geometry && material && <points args={[geometry, material]} />}</>;
}

function App() {
  return (
    <Canvas
      gl={{ antialias: true }}
      //camera location
      camera={{ position: [0, 0, 3] }}
    >
      <color attach="background" args={["#000"]} />
      <ambientLight />

      {/* <OrbitControls /> */}
      <GPGPUParticles />
    </Canvas>
  );
}

export default App;
