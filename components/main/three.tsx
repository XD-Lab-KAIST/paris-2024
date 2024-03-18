import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function ThreeScene({ scrollPos }: any) {
  const meshRef: any = useRef();

  useFrame(() => {
    console.log(scrollPos);
    const scale = 1 + scrollPos * 2;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}
