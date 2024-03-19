"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import useScroll from "@/utils/hooks/useScroll";

import ThreeScene from "./three";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

export default function IntroComp() {
  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <directionalLight intensity={0.5} />
          <ScrollControls pages={5}>
            <ThreeScene />
          </ScrollControls>
        </Canvas>
      </S.ThreeContainer>
    </S.Container>
  );
}
