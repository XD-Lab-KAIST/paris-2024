import React, { forwardRef, useRef, useState, useEffect, useMemo, useContext } from "react";
import { ScrollContext } from "@/components/main";
import useRefs from "react-use-refs";
import * as THREE from "three";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud } from "@react-three/drei";

import SkyAndStars from "./sky-and-stars";
import PostProcessing from "./post-processing";
import Text from "./text";
import GPGPUParticles from "@/foundations/particles-4";

import useMousePos from "@/utils/hooks/useMousePos";

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const THRESHOLD = 0.9998;

export default function ThreeScene({ isIntro, setVideoIdx, setCycleIdx, setUIState }: any) {
  const { scrollPos, setScrollPos } = useContext(ScrollContext);
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [group, earth] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);

  //scroll value

  useFrame((state, delta) => {
    if (!group.current) return;
    const pos = scroll.range(0, THRESHOLD);
    setScrollPos(pos);
    const s1 = scroll.range(1 / 20, 1 / 7);
    const s2 = scroll.range(1 / 7, 0.23);
    let s = (s1 - s2 * 0.82) * 13;

    group.current.scale.x = group.current.scale.y = group.current.scale.z = s;

    let r = scroll.range(0, THRESHOLD);
    if (scrollPos > 0.9) {
      r += (scrollPos - 0.9) * 100;
    }
    group.current.rotation.z = r * 30;

    const y = pos > 0.25 ? (pos > 0.35 ? 1 : (pos - 0.25) * 10) : 0;
    group.current.position.y = -y * height * 0.4;

    // Smooth rotation using lerp
    const targetRotationY = (mousePos.x - 0.5) * Math.PI;
    const targetRotationX = (mousePos.y - 0.5) * Math.PI;

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.07);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.07);
  });

  const START_IDX = 2 / 5;
  const CUT_IDX = 0.92;

  useEffect(() => {
    if (scrollPos > 0.01) setUIState(3);
    if (scrollPos>= THRESHOLD) setUIState(4);

    if (scrollPos < START_IDX || scrollPos >= THRESHOLD) {
      setVideoIdx(-1);
    } else if (scrollPos <= CUT_IDX) {
      let idx = CUT_IDX - (scrollPos - START_IDX) * (CUT_IDX / (CUT_IDX - START_IDX));
      const x = Math.floor(Math.log2(1 / idx));
      setCycleIdx(x);

      let vidIdx = Math.floor((idx - Math.pow(0.5, x + 1)) * Math.pow(2, x + 1) * 3);
      setVideoIdx(2 - vidIdx);
    } else {
      const idx = (scrollPos - CUT_IDX) * 1000000;

      setVideoIdx(Math.floor(idx % 3));
      setCycleIdx(10);
    }
  }, [scrollPos]);

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  return (
    <>
      <group ref={group}>{scrollPos < THRESHOLD ? <primitive object={gltf.scene} /> : <></>}</group>

      <PostProcessing scrollPos={scrollPos} />
      <SkyAndStars scrollPos={scrollPos} isIntro={isIntro} />
      <Text scrollPos={scrollPos} />
      {scrollPos >= THRESHOLD && <GPGPUParticles />}
    </>
  );
}
