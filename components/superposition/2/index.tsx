"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";
 
// const VID_ARR = ["color.mp4", "wireframe.mp4"];
const VID_ARR = ["wireframe.mp4", "color.mp4"];
const SINGLE_CYLCE = 4;

const IntroComponent = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <S.IntroContainer>
      <S.EnterButton onClick={onEnter}>START</S.EnterButton>
    </S.IntroContainer>
  );
};

function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return mousePos;
}

function useMouseDownCount() {
  const [mouseDownCount, setMouseDownCount] = useState(0);
  useEffect(() => {
    const handleMouseDown = () => setMouseDownCount(prev => prev + 1);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseDown);
    };
  }, []);
  return mouseDownCount;
}

export default function MainComp() {
  const [showIntro, setShowIntro] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const mousePos = useMousePosition();
  const mouseDownCount = useMouseDownCount();


  const handleEnter = useCallback(() => {
    console.log("handleEnter called. isStarted:", isStarted);
    if (isStarted) {
      console.log("handleEnter blocked: already started.");
      return;
    }
    setIsStarted(true);
    setShowIntro(false);

    if (videoRef1.current) {
      console.log("Playing video 1");
      videoRef1.current.play();
      videoRef1.current.muted = false;
    }
    if (videoRef2.current) {
      console.log("Playing video 2");
      videoRef2.current.play();
      videoRef2.current.muted = false;
    }
    if (audioRef.current) {
      console.log("Playing audio");
      audioRef.current.play();
    }
  }, [isStarted]);


  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        console.log('[superposition/3] prevented pinch-zoom via wheel+ctrl');
      }
    };
    const onGesture = (e: Event) => {
      e.preventDefault();
      console.log('[superposition/3] prevented Safari gesture', (e as any).type);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        console.log('[superposition/3] prevented multi-touch scroll');
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('gesturestart', onGesture as EventListener, { passive: false } as any);
    window.addEventListener('gesturechange', onGesture as EventListener, { passive: false } as any);
    window.addEventListener('gestureend', onGesture as EventListener, { passive: false } as any);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('gesturestart', onGesture as EventListener);
      window.removeEventListener('gesturechange', onGesture as EventListener);
      window.removeEventListener('gestureend', onGesture as EventListener);
      window.removeEventListener('touchmove', onTouchMove as any);
    };
  }, []);


  const OPTIONS = [
    `white 0%, white 1%, transparent 2%`,
    `white 0%, white 9%, transparent 10%`, 
    `white 0%, white 18%, rgba(255, 255, 255, 0.3) 20%`,
    `white 0%, white 18%, transparent 20%`,
  ]

  //to do: 파동 함수. Big cycle, small cycle.
  const optionGenerator = (mouseDownCount: number) => {
    const cycleCount = Math.floor(mouseDownCount / SINGLE_CYLCE);
    const targetBaseWhite = (cycleCount * 10) % 100;

    if(mouseDownCount % SINGLE_CYLCE === 0){
      return `white 0%, white ${targetBaseWhite * 0.2 + 1}%, transparent ${targetBaseWhite * 0.2 + 2}%`
    } else if (mouseDownCount % SINGLE_CYLCE === 1){
      return `white 0%, white ${targetBaseWhite * 0.6 + 9}%, transparent ${targetBaseWhite * 0.6 + 10}%`
    } else if (mouseDownCount % SINGLE_CYLCE === 2){
      return `white 0%, white ${targetBaseWhite + 18}%, rgba(255, 255, 255, 0.1) ${targetBaseWhite + 35}%`
    } else if (mouseDownCount % SINGLE_CYLCE === 3){
      return `white 0%, white ${targetBaseWhite * 0.6 + 14}%, transparent ${targetBaseWhite * 0.6 + 15}%`
    }


    // if(mouseDownCount % SINGLE_CYLCE === 0){
    //   return `white 0%, white 1%, transparent 2%`
    // } else if (mouseDownCount % SINGLE_CYLCE === 1){
    //   return `white 0%, white 9%, transparent 10%`
    // } else if (mouseDownCount % SINGLE_CYLCE === 2){
    //   return `white 0%, white 18%, rgba(255, 255, 255, 0.0) 100%`
    // } else if (mouseDownCount % SINGLE_CYLCE === 3){
    //   return `white 0%, white 18%, transparent 20%`
    // }
  }


  return (
    <S.Container>
      {showIntro && <IntroComponent onEnter={handleEnter} />}
      <S.VideoWrapper>
        <S.StyledVideo ref={videoRef1} loop muted playsInline key={0}>
          <source src={`/video/superposition/${VID_ARR[0]}`} type="video/mp4" />
        </S.StyledVideo>
        <S.StyledVideo
          ref={videoRef2}
          loop
          muted
          playsInline
          key={1}
          style={{
            mask: `radial-gradient(circle at ${mousePos.x}px ${
              mousePos.y
            }px, ${optionGenerator(mouseDownCount)})`,
            transition: `mask ${100 / mouseDownCount}s ease-in-out`,

            //invert colour when mousedowncount is odd
            //when mousedowncount % 4 === 0, it's grayscale
            filter:
              mouseDownCount % 2 === 1
                ? "invert(1)"
                : mouseDownCount % 4 === 0
                ? "grayscale(100%)"
                : "none",
          }}
        >
          <source src={`/video/superposition/${VID_ARR[1]}`} type="video/mp4" />
        </S.StyledVideo>
      </S.VideoWrapper>
      <audio ref={audioRef} src="/video/superposition/sound.mp3" loop />
    </S.Container>
  );
}