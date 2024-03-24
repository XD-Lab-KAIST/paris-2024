import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, ScrollControls, OrbitControls, Instances, Instance, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import useMousePos from "@/utils/hooks/useMousePos";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ setVideoIdx }: any) {
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [scrollPos, setScrollPos] = useState(0);
  const [group, box] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);

  //scroll value

  useFrame((state, delta) => {
    setScrollPos(scroll.range(0, 1));
    const s = scroll.range(0, 1 / 4);

    group.current.scale.x = group.current.scale.y = group.current.scale.z = (s + 0.1) * 10;

    const r = scroll.range(1 / 4, 1);
    group.current.rotation.y = r * 5;

    group.current.rotation.x = mousePos.x;

    const y = scroll.range(2 / 5, 1 / 2);
    group.current.position.y = -y * height * 0.3;

    const a = scroll.range(1 / 2, 1) * 2;
    setVideoIdx(-1 + Math.ceil(a * 3));
  });

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  console.log(gltf);

  return (
    <>
      <directionalLight intensity={3} color={new THREE.Color().setHSL(scrollPos, 1, 0.5)} />
      <group ref={group}>
        <primitive object={gltf.scene} />
      </group>
    </>
  );
}
