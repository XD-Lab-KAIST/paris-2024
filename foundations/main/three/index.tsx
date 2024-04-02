import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud } from "@react-three/drei";
import * as THREE from "three";

import SkyAndStars from "./sky-and-stars";
import PostProcessing from "./post-processing";
import Text from "./text";
import GPGPUParticles from "@/foundations/particles";

import useMousePos from "@/utils/hooks/useMousePos";

const INITIAL_SCALE = 0.01;

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export default function ThreeScene({ videoIdx, setVideoIdx, setCycleIdx }: any) {
  const scroll = useScroll();
  const mousePos = useMousePos();

  const [scrollPos, setScrollPos] = useState(0);
  const [group, earth] = useRefs<any>();

  const { width, height } = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);

  //scroll value

  useFrame((state, delta) => {
    const pos = scroll.range(0, 1);
    setScrollPos(pos);
    const s1 = scroll.range(1 / 20, 1 / 7);
    const s2 = scroll.range(1 / 7, 0.23);
    const s = s1 - s2 * 0.75;

    group.current.scale.x = group.current.scale.y = group.current.scale.z = s * 13;

    const r = scroll.range(0, 1);
    group.current.rotation.z = r * 30;

    const y = pos > 0.25 ? (pos > 0.35 ? 1 : (pos - 0.25) * 10) : 0;
    group.current.position.y = -y * height * 0.4;

    group.current.rotation.y = (mousePos.x - 0.5) * Math.PI;
    group.current.rotation.x = (mousePos.y - 0.5) * Math.PI;
  });

  const CUT_IDX = 0.95;
  useEffect(() => {
    if (scrollPos < 2 / 5 || scrollPos == 1) {
      setVideoIdx(-1);
    } else if (scrollPos <= CUT_IDX) {
      let idx = CUT_IDX - ((scrollPos - 2 / 5) * 5) / 3;
      const x = Math.floor(Math.log2(1 / idx));
      setCycleIdx(x);
      let vidIdx = Math.floor((idx - Math.pow(0.5, x + 1)) * Math.pow(2, x + 1) * 3);
      setVideoIdx(2 - vidIdx);
    } else {
      const idx = (scrollPos - CUT_IDX) * 1000000;
      setVideoIdx(idx % 3);
      setCycleIdx(10);
    }
  }, [scrollPos]);

  const gltf = useGLTF("/3d/EarthShell_vertexColor.gltf");

  return (
    <>
      <group ref={group}>
        <primitive object={gltf.scene} />
      </group>

      <PostProcessing scrollPos={scrollPos} />
      <SkyAndStars scrollPos={scrollPos} />
      <Text scrollPos={scrollPos} />
      {/* <GPGPUParticles /> */}
    </>
  );
}
