import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, ScrollControls, OrbitControls, useGLTF } from "@react-three/drei";
import { useSpring, a, easings } from "@react-spring/three";

import { TextureLoader } from "three";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ setVideoIdx }: any) {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);

  const [box] = useRefs<any>();

  useFrame((state, delta) => {
    const s = scroll.range(0, 1 / 4);

    box.current.scale.x = box.current.scale.y = box.current.scale.z = s + 0.1;

    const r = scroll.range(1 / 4, 1);
    box.current.rotation.y = r * 5;

    const y = scroll.range(2 / 5, 1 / 2);
    box.current.position.y = -y * height * 0.4;

    const a = scroll.range(1 / 2, 1) * 2;
    setVideoIdx(-1 + Math.ceil(a * 3));
  });

  return (
    <>
      <mesh ref={box}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}
