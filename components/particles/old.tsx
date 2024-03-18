"use client";

import * as S from "./styles";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// Import shader strings (vertexShader, fragmentShader, etc.) from external files as necessary

// Custom Shader Material for particles
const ParticlesShaderMaterial = shaderMaterial(
  // Uniforms
  { time: 0, resolution: new THREE.Vector2() },
  // vertex shader
  `vertex shader code here`,
  // fragment shader
  `fragment shader code here`
);

// Extend will make OrbitControls available as a JSX element for us to use.
extend({ OrbitControls, ParticlesShaderMaterial });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current?.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/3d/model.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  // Process and use the GLTF or GLB model as needed
  // For example, setting up the model's position, adding it to the scene, etc.

  return null; // This should return the model or null if you're adding the model to the scene in another way
};

const Particles = () => {
  // Setup particles using the ParticlesShaderMaterial and custom logic
  // This might involve creating a geometry, applying the shader material, and then using a <primitive> to add it to the scene

  return null; // Placeholder, replace with actual particle system implementation
};

const Scene = () => {
  return (
    <>
      <CameraControls />
      <Model />
      <Particles />
      {/* Add more objects or effects as needed */}
    </>
  );
};

const App = () => {
  return (
    <S.Container>
      <Canvas
        camera={{ position: [4.5, 4, 11] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#29191f"));
        }}
      >
        <Scene />
      </Canvas>
    </S.Container>
  );
};

export default App;
