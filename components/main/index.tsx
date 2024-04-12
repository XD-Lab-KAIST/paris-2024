"use client";

import { useRef, useState, useEffect, createContext, useContext } from "react";
import * as S from "./styles";
import usePreventTouchSideEffects from "@/utils/hooks/usePreventTouchSideEffects";

import ThreeScene from "@/foundations/main/three";
import VideoComp from "@/foundations/main/video";

import UI from "@/foundations/main/ui";
import Intro from "@/foundations/main/intro";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import { Leva } from "leva";

export const ScrollContext = createContext({
  scrollPos: 0,
  setScrollPos: (arg: any) => {},
});

export default function MainComp() {
  const [scrollPos, setScrollPos] = useState(0);
  const contextValue: any = { scrollPos, setScrollPos };

  const [videoIdx, setVideoIdx] = useState(-1);
  const [cycleIdx, setCycleIdx] = useState(0);

  // usePreventTouchSideEffects();

  const [isIntro, setIsIntro] = useState(true);
  const [uiState, setUIState] = useState(0);

  function handleReset() {
    //page reload
    setVideoIdx(-1);
    window.location.reload();
  }

  const audioRef: any = useRef();

  useEffect(() => {
    try {
      if (!isIntro) {
        //move to start
        if (!audioRef.current) return;

        audioRef.current.volume = 1;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        //stop
        if (!audioRef.current) return;
        audioRef.current.pause();
      }
    } catch (e) {
      console.log(e);
    }
  }, [isIntro]);

  return (
    <ScrollContext.Provider value={contextValue}>
      <S.Container>
        <Intro isIntro={isIntro} setIsIntro={setIsIntro} uiState={uiState} setUIState={setUIState} />
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

        <audio ref={audioRef} src="/audio/audio.mp3" loop />
        <Leva collapsed={true} hidden={true} />
      </S.Container>
    </ScrollContext.Provider>
  );
}
