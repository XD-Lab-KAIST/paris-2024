"use client";

import { useRef, useState, useEffect } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";
 
// const VID_ARR = ["color.mp4", "wireframe.mp4"];
const VID_ARR = ["wireframe.mp4", "color.mp4"];

const OPTIONS = [
  `white 0%, white 1%, transparent 2%`,
  `white 0%, white 18%, transparent 20%`, 
  // `white 0%, black 100%`,
  `white 0%, black 100%`,
  `white 0%, white 18%, transparent 20%`,
]



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

function useMouseDown() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return isMouseDown;
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
 
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const mousePos = useMousePosition();
  const isMouseDown = useMouseDown();
  const mouseDownCount = useMouseDownCount();

  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {

    const handleClick = () => {
      if (videoRef1.current) {
        videoRef1.current.muted = false;
      }
      if (videoRef2.current) {
        videoRef2.current.muted = false;
      }
      window.removeEventListener("click", handleClick);
    };

    
    window.addEventListener("click", handleClick);

    return () => {
      
      window.removeEventListener("click", handleClick);
    };
  }, []);





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
  
  return (
    <S.Container>
      <S.VideoWrapper>
        <S.StyledVideo ref={videoRef1} autoPlay loop muted playsInline key={0}
     
        >
          <source src={`/video/superposition/${VID_ARR[0]}`} type="video/mp4" />
        </S.StyledVideo>
        <S.StyledVideo
          ref={videoRef2}
          autoPlay
          loop
          muted
          playsInline
          key={1}
          style={{
            // opacity: isMouseDown ? 1 : 0,
            mask: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${OPTIONS[mouseDownCount % OPTIONS.length]})`,
            transition: `mask 0.3s ease-in-out`,
  
          }}
        >
          <source src={`/video/superposition/${VID_ARR[1]}`} type="video/mp4" />
        </S.StyledVideo>
      </S.VideoWrapper>
    </S.Container>
  );
}