import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { TextureLoader } from "three";

export default function ThreeScene({ scrollPos }: any) {
  const meshRef: any = useRef();

  useFrame(() => {
    console.log(scrollPos);
    const scale = 0.5 + scrollPos;
    if (!meshRef.current) return;
    meshRef.current.scale.set(scale, scale, scale);
  });

  const gltf = useGLTF("/3d/earth.gltf");

  const texture = useLoader(TextureLoader, "/3d/texture.jpg");

  useEffect(() => {
    if (!gltf.scene) return;
    gltf.scene.traverse((object: any) => {
      if (object.isMesh) {
        object.material.map = texture;
        object.material.needsUpdate = true;
      }
    });
  }, [texture, gltf.scene]);

  return (
    <>
      <primitive object={gltf.scene} ref={meshRef} />
    </>
  );
}
