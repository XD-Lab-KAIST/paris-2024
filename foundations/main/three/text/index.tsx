import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import { textGenerator, TEXTS } from "./constant";

import { useControls } from "leva";

const FONT_PATH = "/fonts/Poiret.json";

const material = new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(180, 10%, 95%)"), roughness: 0, metalness: 1 });

const TextComponent = React.memo(({ scrollPos }: any) => {
  const { viewport } = useThree();
  const groupPosition = useMemo(() => [0, -scrollPos * 100 * viewport.height * 0.3, 0], [scrollPos, viewport.height]);

  const controlParams = useControls({
    bevelSize: {
      value: 0.05,
      min: 0,
      max: 1,
      step: 0.01,
    },
    bevelThickness: {
      value: 0.05,
      min: 0,
      max: 0.2,
      step: 0.001,
    },
    height: {
      value: 0.005,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    bevelSegments: {
      value: 5,
      min: 0,
      max: 10,
      step: 1,
    },
    curveSegments: {
      value: 3,
      min: 0,
      max: 10,
      step: 1,
    },
    scaleIntensity: {
      value: 2,
      min: 0,
      max: 3,
      step: 0.01,
    },
    letterSpacing: {
      value: -0.2,
      min: -1,
      max: 1,
      step: 0.01,
    },
    rotationIntensity: {
      value: 12,
      min: 0,
      max: 30,
      step: 1,
    },
  });

  const groupRef = useRef();

  // useFrame(() => {
  //   if (!groupRef.current || !groupRef.current.rotation) return;
  //   groupRef.current.rotation.y = (mousePos.x - 0.5) * 0.1;
  //   // groupRef.current.rotation.x = mousePos.y * 0.5;
  // });

  return (
    <group position={new THREE.Vector3(groupPosition[0], groupPosition[1], groupPosition[2])} ref={groupRef}>
      {scrollPos <= 0.4 && TEXTS.map((el, i) => <SingleEl controlParams={controlParams} key={i} viewport={viewport} el={el} />)}
    </group>
  );
});

const SingleEl = React.memo(({ viewport, el, controlParams }: any) => {
  const pos = useMemo(() => [el.position[0] * viewport.width * 1, (el.position[1] + el.show * 100) * viewport.height * 0.3, el.position[2] * viewport.width * 0.1 - 8], [viewport, el]);

  return (
    <Center position={new THREE.Vector3(pos[0], pos[1], pos[2])}>
      <Text3D bevelEnabled {...controlParams} scale={el.fontSize * controlParams.scaleIntensity} font={FONT_PATH}>
        {el.text.toLowerCase()}
        <primitive object={material} />
      </Text3D>
    </Center>
  );
});

export default TextComponent;
