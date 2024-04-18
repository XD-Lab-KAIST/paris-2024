"use client";

import { useRef, useMemo, useState, useEffect, createContext, useContext } from "react";
import useRefs from "react-use-refs";
import * as S from "./styles";

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

  const [isIntro, setIsIntro] = useState(true);
  const [uiState, setUIState] = useState(0);

  const [audioRef1, audioRef2, audioRef3] = useRefs<any>();
  const [playAudioIntervalRef, pauseAudioIntervalRef] = useRefs<any>();

  function playAudioEl(audioEl: any) {
    if (!audioEl) return;
    audioEl.play();
    //incrementally increase the volume
    if (playAudioIntervalRef.current) clearInterval(playAudioIntervalRef.current);
    playAudioIntervalRef.current = setInterval(() => {
      audioEl.volume = Math.min(1, audioEl.volume + 0.01);
      if (audioEl.volume === 1) clearInterval(playAudioIntervalRef.current);
    }, 10);
  }

  function pauseAudioEl(audioEl: any) {
    if (!audioEl) return;
    //check if audioEl is playing
    if (audioEl.paused) return;

    if (pauseAudioIntervalRef.current) clearInterval(pauseAudioIntervalRef.current);
    pauseAudioIntervalRef.current = setInterval(() => {
      audioEl.volume = Math.max(0, audioEl.volume - 0.01);
      if (audioEl.volume < 0.05) {
        clearInterval(pauseAudioIntervalRef.current);
        audioEl.pause();
      }
    }, 10);
  }

  useEffect(() => {
    try {
      if (uiState <= 1) {
        playAudioEl(audioRef1.current);
        if (audioRef1.current) audioRef1.current.currentTime = 0;
        pauseAudioEl(audioRef2.current);
        pauseAudioEl(audioRef3.current);
      } else if (uiState >= 2 && uiState <= 3) {
        playAudioEl(audioRef2.current);

        pauseAudioEl(audioRef1.current);
        pauseAudioEl(audioRef3.current);
      } else if (uiState === 4) {
        playAudioEl(audioRef3.current);
        pauseAudioEl(audioRef1.current);
        pauseAudioEl(audioRef2.current);
      }
    } catch (e) {
      console.log(e);
    }
  }, [uiState]);

  function handleReset() {
    //first pause all audioel
    if (audioRef1.current) pauseAudioEl(audioRef1.current);
    if (audioRef2.current) pauseAudioEl(audioRef2.current);
    if (audioRef3.current) pauseAudioEl(audioRef3.current);

    //timeout 3s
    setTimeout(() => {
      //page reload
      setVideoIdx(-1);
      window.location.reload();
    }, 3000);
  }

  const scollerLength = useMemo(() => {
    try {
      //detect device, if macos

      if (typeof window !== "undefined" && window.navigator) {
        const isMac = window.navigator.platform.toUpperCase().includes("MAC");
        return isMac ? 150 : 75;
      } else {
        // Default value if window or navigator is not available
        return 150;
      }
    } catch (e) {
      console.log(e);
      return 150;
    }
  }, []);

  return (
    <ScrollContext.Provider value={contextValue}>
      <S.Container>
        <Intro isIntro={isIntro} setIsIntro={setIsIntro} uiState={uiState} setUIState={setUIState} />
        <S.ThreeContainer>
          <VideoComp videoIdx={videoIdx} setVideoIdx={setVideoIdx} cycleIdx={cycleIdx} uiState={uiState} />
          <Canvas
            //camera near far
            camera={{ near: 0.01, far: 1000 }}
          >
            <ScrollControls
              pages={scollerLength}
              //stylye scrollbar hide
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <ThreeScene videoIdx={videoIdx} isIntro={isIntro} setVideoIdx={setVideoIdx} setCycleIdx={setCycleIdx} setUIState={setUIState} />
            </ScrollControls>
          </Canvas>
        </S.ThreeContainer>

        <UI uiState={uiState} handleReset={handleReset} />

        <audio ref={audioRef1} src="/audio/audio1.mp3" loop />
        <audio ref={audioRef2} src="/audio/audio2.mp3" loop />
        <audio ref={audioRef3} src="/audio/audio3.mp3" loop />
        <Leva collapsed={true} hidden={true} />
      </S.Container>
    </ScrollContext.Provider>
  );
}
