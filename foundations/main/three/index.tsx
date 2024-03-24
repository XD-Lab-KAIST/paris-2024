import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, Stars, Instances, Instance, useGLTF, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

import useMousePos from "@/utils/hooks/useMousePos";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ setVideoIdx }: any) {
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [scrollPos, setScrollPos] = useState(0);
  const [group, earth] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);

  //scroll value

  console.log(mousePos);

  useFrame((state, delta) => {
    setScrollPos(scroll.range(0, 1));
    const s = scroll.range(0, 1 / 4);

    group.current.scale.x = group.current.scale.y = group.current.scale.z = (s + 0.1) * 5;

    const r = scroll.range(1 / 4, 1);
    group.current.rotation.z = r * 5;

    group.current.rotation.y = (mousePos.x - 0.5) * (Math.PI / 2);
    group.current.rotation.x = (mousePos.y - 0.5) * (Math.PI / 2);

    const y = scroll.range(2 / 5, 1 / 2);
    group.current.position.y = -y * height * 0.3;

    const a = scroll.range(1 / 2, 1) * 2;
    setVideoIdx(-1 + Math.ceil(a * 3));
  });

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  console.log(gltf);

  return (
    <>
      <directionalLight intensity={3} color={new THREE.Color().setHSL(scrollPos, 1, 0.5)} position={[0, 5 * Math.sin(scrollPos * Math.PI), 5 * Math.cos(scrollPos * Math.PI)]} />
      <group ref={group}>
        <primitive object={gltf.scene} />
        {/* <Center>
          <Text3D
            //font source
            font={"/fonts/Roboto_Regular.json"}
            color="white"
            fontSize={0.01}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            textAlign="center"
          >
            {Math.floor(scrollPos * 100)}
          </Text3D>
        </Center> */}
      </group>

      <Stars radius={100} depth={50} count={scrollPos < 0.5 ? 5000 : 0} factor={4} saturation={0} fade mixed animated />
    </>
  );
}
