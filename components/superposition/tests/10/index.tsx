"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";
const VID_ARR = ["color.mp4", "wireframe.mp4"];

const SPEED_RANGE = [0.5, 1, 2];


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

  // Precompute center and max distance from center to corner as window changes
  const { centerX, centerY, maxDistance } = useMemo(() => {
    const cx = windowWidth / 2;
    const cy = windowHeight / 2;
    const D = Math.hypot(cx, cy);
    return { centerX: cx, centerY: cy, maxDistance: D };
  }, [windowWidth, windowHeight]);

  // Hyperbolic speed mapping based on distance from center
  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2 || !windowWidth || !windowHeight) return;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const d = Math.hypot(dx, dy);

    // Solve a/(d + b) + c to satisfy:
    // d=0 -> 0.25, d=maxDistance/2 -> 1, d=maxDistance -> 4
    // This yields: a = -(5/3)*D, b = -(4/3)*D, c = -1
    const D = maxDistance || 1; // avoid division by zero
    const a = -(5 / 3) * D;
    const b = -(4 / 3) * D;
    const c = -1;
    const computed = a / (d + b) + c;

    const clamped = Math.min(SPEED_RANGE[2], Math.max(SPEED_RANGE[0], computed));

    v1.play().catch(() => undefined);
    v2.play().catch(() => undefined);
    v1.playbackRate = clamped;
    v2.playbackRate = clamped;
  }, [mousePos.x, mousePos.y, centerX, centerY, maxDistance, windowWidth, windowHeight]);

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

  const OPTIONS = [`white 0%, transparent 10%`,  `transparent 3%, white 6%, white 100%`


  ]

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
            mask: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${OPTIONS[isMouseDown ? 1 : 0]})`,
            transition: `mask 0.3s ease-in-out`,
  
          }}
        >
          <source src={`/video/superposition/${VID_ARR[1]}`} type="video/mp4" />
        </S.StyledVideo>
      </S.VideoWrapper>
    </S.Container>
  );
}