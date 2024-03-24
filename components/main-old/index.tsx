"use client";

import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import useScroll from "@/utils/hooks/useScroll";

import ThreeScene from "./three";
import VideoComp from "./video";

import { Canvas } from "@react-three/fiber";

export default function IntroComp() {
  const containerRef = useRef();
  const { scroll: scrollPos, listenToScroll } = useScroll(containerRef);

  const [videoIdx, setVideoIdx] = useState(-1);

  useEffect(() => {
    if (scrollPos > 0.95) {
      setVideoIdx(0);
    }
  }, [scrollPos]);

  console.log(videoIdx);

  return (
    <S.Container ref={containerRef}>
      <S.ScrollContainer
        style={{
          zIndex: listenToScroll ? 1 : 0,
        }}
      />
      <S.OverlaidContainer>
        <VideoComp videoIdx={videoIdx} />
        <S.ThreeContainer>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <directionalLight intensity={0.5} />
            <ThreeScene scrollPos={scrollPos} setVideoIdx={setVideoIdx} />
          </Canvas>
        </S.ThreeContainer>
      </S.OverlaidContainer>
    </S.Container>
  );
}
