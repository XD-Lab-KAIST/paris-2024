"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import usePreventBackOnScroll from "@/utils/hooks/usePreventBackOnScroll";

import ThreeScene from "@/foundations/main/three";
import VideoComp from "@/foundations/main/video";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

export default function IntroComp() {
  const [videoIdx, setVideoIdx] = useState(-1);
  const [cycleIdx, setCycleIdx] = useState(0);

  usePreventBackOnScroll();

  return (
    <S.Container>
      <S.ThreeContainer>
        <VideoComp videoIdx={videoIdx} cycleIdx={cycleIdx} />
        <Canvas>
          {/* <ambientLight /> */}

          <ScrollControls pages={150}>
            <ThreeScene videoIdx={videoIdx} setVideoIdx={setVideoIdx} setCycleIdx={setCycleIdx} />
          </ScrollControls>
        </Canvas>
      </S.ThreeContainer>
    </S.Container>
  );
}
