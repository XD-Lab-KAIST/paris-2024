"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import usePreventTouchSideEffects from "@/utils/hooks/usePreventTouchSideEffects";

import ThreeScene from "@/foundations/main/three";
import VideoComp from "@/foundations/main/video";

import UI from "@/foundations/main/ui";
import Intro from "@/foundations/main/intro";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

export default function MainComp() {
  const [videoIdx, setVideoIdx] = useState(-1);
  const [cycleIdx, setCycleIdx] = useState(0);

  // usePreventTouchSideEffects();

  const [isIntro, setIsIntro] = useState(true);
  const [uiState, setUIState] = useState(0);

  const scrollRef = useRef();

  function handleReset() {
    //page reload
    window.location.reload();
  }

  return (
    <S.Container>
      <Intro isIntro={isIntro} setIsIntro={setIsIntro} setUIState={setUIState} />
      <S.ThreeContainer>
        <VideoComp videoIdx={videoIdx} setVideoIdx={setVideoIdx} cycleIdx={cycleIdx} />
        <Canvas
          //camera near far
          camera={{ near: 0.01, far: 1000 }}
        >
          <ScrollControls pages={150}>
            <ThreeScene videoIdx={videoIdx} setVideoIdx={setVideoIdx} setCycleIdx={setCycleIdx} setUIState={setUIState} />
          </ScrollControls>
        </Canvas>
      </S.ThreeContainer>

      <UI uiState={uiState} handleReset={handleReset} />
    </S.Container>
  );
}
