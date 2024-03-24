import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud } from "@react-three/drei";
import * as THREE from "three";

import PostProcessing from "./post-processing";

import useMousePos from "@/utils/hooks/useMousePos";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ setVideoIdx }: any) {
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [scrollPos, setScrollPos] = useState(0);
  const [group, earth] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);

  //scroll value

  console.log(mousePos);

  useFrame((state, delta) => {
    setScrollPos(scroll.range(0, 1));
    const s = scroll.range(0, 1 / 4);

    group.current.scale.x = group.current.scale.y = group.current.scale.z = (s + 0.1) * 5;

    const r = scroll.range(1 / 4, 1);
    group.current.rotation.y = r * 5;

    const y = scroll.range(2 / 5, 1 / 2);
    group.current.position.y = -y * height * 0.3;

    const a = scroll.range(1 / 2, 1) * 2;
    setVideoIdx(a <= 0 ? -1 : Math.ceil(a * 30) % 3);

    group.current.rotation.y = (mousePos.x - 0.5) * Math.PI;
    group.current.rotation.x = (mousePos.y - 0.5) * Math.PI;

    //camera  --> accordingly to mousepos
    // const angle = Math.PI * 2 * mousePos.x;
    // const R = 1;
    // camera.position.x = R * Math.cos(angle);
    // camera.position.y = R * Math.sin(angle);
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

      <PostProcessing />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade animated />
      <Sparkles />
      {/* <Cloud seed={1} count={100} /> */}
      <Environment preset="dawn" />
      {/* <Environment preset="city" /> */}

      {/* <CameraShake intensity={1} yawFrequency={1} pitchFrequency={1} rollFrequency={1} triggerThreshold={0.5} active /> */}

      {/* <FaceLandmarker>
        <FaceControls />
      </FaceLandmarker> */}
    </>
  );
}
