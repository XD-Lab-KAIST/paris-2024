"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import usePreventTouchSideEffects from "@/utils/hooks/usePreventTouchSideEffects";

import ThreeScene from "@/foundations/main/three";
import VideoComp from "@/foundations/main/video";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

export default function MainComp() {
  const [videoIdx, setVideoIdx] = useState(-1);
  const [cycleIdx, setCycleIdx] = useState(0);

  // usePreventTouchSideEffects();

  const [isIntro, setIsIntro] = useState(true);

  return (
    <S.Container>
      <Intro isIntro={isIntro} setIsIntro={setIsIntro} />
      <S.ThreeContainer>
        <VideoComp videoIdx={videoIdx} cycleIdx={cycleIdx} />
        <Canvas
          //camera near far
          camera={{ near: 0.01, far: 1000 }}
        >
          {/* <ambientLight /> */}

          <ScrollControls pages={150}>
            <ThreeScene videoIdx={videoIdx} setVideoIdx={setVideoIdx} setCycleIdx={setCycleIdx} />
          </ScrollControls>
        </Canvas>
      </S.ThreeContainer>
    </S.Container>
  );
}

function Intro({ isIntro, setIsIntro }: any) {
  return (
    <S.Intro
      onClick={() => setIsIntro(false)}
      style={{
        opacity: isIntro ? 1 : 0,
        pointerEvents: isIntro ? "all" : "none",
      }}
    >
      <h1>Uncharted Territory</h1>
    </S.Intro>
  );
}
