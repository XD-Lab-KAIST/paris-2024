import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud } from "@react-three/drei";
import * as THREE from "three";

import SkyAndStars from "./sky-and-stars";
import PostProcessing from "./post-processing";

import useMousePos from "@/utils/hooks/useMousePos";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ videoIdx, setVideoIdx, setCycleIdx }: any) {
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [scrollPos, setScrollPos] = useState(0);
  const [group, earth] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);

  //scroll value

  console.log(scrollPos);

  useFrame((state, delta) => {
    setScrollPos(scroll.range(0, 1));
    const s1 = scroll.range(1 / 20, 1 / 6);
    const s2 = scroll.range(1 / 6, 2 / 5);
    const s = s1 - s2 * 0.5;
    console.log(s1, s2);

    group.current.scale.x = group.current.scale.y = group.current.scale.z = s * 9;

    const r = scroll.range(0, 1 / 3);
    group.current.rotation.z = r ** 2 * 20;

    const y = scroll.range(1 / 5, 2 / 5);
    group.current.position.y = -y * height * 0.3;

    group.current.rotation.y = (mousePos.x - 0.5) * Math.PI;
    group.current.rotation.x = (mousePos.y - 0.5) * Math.PI;
  });

  useEffect(() => {
    if (scrollPos < 2 / 5 || scrollPos == 1) {
      setVideoIdx(-1);
    } else {
      let idx = 1 - ((scrollPos - 2 / 5) * 5) / 3;
      const x = Math.floor(Math.log2(1 / idx));
      setCycleIdx(x);
      let vididx = Math.floor((idx - Math.pow(0.5, x + 1)) * Math.pow(2, x + 1) * 3);
      setVideoIdx(2 - vididx);
    }
  }, [scrollPos]);

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  console.log(gltf);

  return (
    <>
      <CustomLight scrollPos={scrollPos} />
      <group ref={group}>
        <primitive object={gltf.scene} />
      </group>

      <PostProcessing scrollPos={scrollPos} />
      <SkyAndStars scrollPos={scrollPos} />

      {/* <Cloud seed={1} count={100} /> */}
      {/* <Environment preset={"dawn"} /> */}
    </>
  );
}

function CustomLight({ scrollPos }: any) {
  const hue = useMemo(() => {
    if (scrollPos < 1 / 4) {
      return scrollPos * 4;
    } else if (1 / 4 <= scrollPos && scrollPos <= 0.3) {
      return ((scrollPos - 1 / 4) * 100) % 1;
    }
    return 1;
  }, [scrollPos]);

  return <directionalLight intensity={3} color={new THREE.Color().setHSL(hue, 1, 0.5)} position={[0, 5 * Math.sin(scrollPos * Math.PI), 5 * Math.cos(scrollPos * Math.PI)]} />;
}
