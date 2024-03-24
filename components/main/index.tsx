"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import useScroll from "@/utils/hooks/useScroll";

import ThreeScene from "@/foundations/main/three";
import VideoComp from "@/foundations/main/video";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

export default function IntroComp() {
  const [videoIdx, setVideoIdx] = useState(-1);

  return (
    <S.Container>
      <S.ThreeContainer>
        <VideoComp videoIdx={videoIdx} />
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <ScrollControls pages={50}>
            <ThreeScene setVideoIdx={setVideoIdx} />
          </ScrollControls>
        </Canvas>
      </S.ThreeContainer>
    </S.Container>
  );
}
