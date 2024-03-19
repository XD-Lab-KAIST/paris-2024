import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, ScrollControls, OrbitControls, useGLTF } from "@react-three/drei";
import { useSpring, a, easings } from "@react-spring/three";

import { TextureLoader } from "three";

const INITIAL_SCALE = 0.01;

export default function ThreeScene() {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);

  const [box] = useRefs<any>();

  useFrame((state, delta) => {
    const s = scroll.range(0, 1);

    box.current.scale.x = box.current.scale.y = box.current.scale.z = s;
  });

  return (
    <>
      <mesh ref={box}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </>
  );
}
