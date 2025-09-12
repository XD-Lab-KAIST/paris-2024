"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import * as S from "./styles";
 
const VID_ARR = ["color.mp4", "wireframe.mp4"];

interface MouseData {
  x: number;
  y: number;
  timestamp: number;
}

export default function MainComp() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clipSize, setClipSize] = useState(10); // in vw units
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const mouseHistoryRef = useRef<MouseData[]>([]);
  const animationFrameRef = useRef<number>();

  // Calculate mouse speed and update clip size
  const calculateSpeed = useCallback((currentMouse: MouseData) => {
    const history = mouseHistoryRef.current;
    const now = currentMouse.timestamp;
    
    // Keep only recent history (last 100ms)
    const recentHistory = history.filter(point => now - point.timestamp < 100);
    mouseHistoryRef.current = recentHistory;
    
    if (recentHistory.length < 2) return 0;
    
    // Calculate speed based on distance over time
    let totalDistance = 0;
    let totalTime = 0;
    
    for (let i = 1; i < recentHistory.length; i++) {
      const prev = recentHistory[i - 1];
      const curr = recentHistory[i];
      
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
      const time = curr.timestamp - prev.timestamp;
      
      if (time > 0) {
        totalDistance += distance;
        totalTime += time;
      }
    }
    
    return totalTime > 0 ? totalDistance / totalTime : 0;
  }, []);

  // Update clip size based on speed with smooth transitions
  const updateClipSize = useCallback(() => {
    const history = mouseHistoryRef.current;
    if (history.length === 0) return;
    
    const lastMove = history[history.length - 1];
    const timeSinceLastMove = Date.now() - lastMove.timestamp;
    const speed = calculateSpeed(lastMove);
    
    // Base size: 5vw, max size: 25vw
    // Speed multiplier: faster mouse = larger clip
    const baseSize = 1;
    const maxSize = 60;
    const speedMultiplier = Math.min(speed * 0.1, 2); // Cap the multiplier
    
    // Time decay: if no movement for a while, shrink back to base
    const decayFactor = timeSinceLastMove > 1000 ? 
      Math.max(0.3, 1 - (timeSinceLastMove - 1000) / 2000) : 1;
    
    const targetSize = baseSize + (maxSize - baseSize) * speedMultiplier * decayFactor;
    
    // Smooth transition
    setClipSize(prevSize => {
      const diff = targetSize - prevSize;
      return prevSize + diff * 0.1; // Smooth interpolation
    });
    
    animationFrameRef.current = requestAnimationFrame(updateClipSize);
  }, [calculateSpeed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseData: MouseData = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
      
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseHistoryRef.current.push(mouseData);
      
      // Start animation loop if not already running
      if (!animationFrameRef.current) {
        updateClipSize();
      }
    };

    const handleClick = () => {
      if (videoRef1.current) {
        videoRef1.current.muted = false;
      }
      if (videoRef2.current) {
        videoRef2.current.muted = false;
      }
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateClipSize]);

  return (
    <S.Container>
      <S.VideoWrapper>
        <S.StyledVideo ref={videoRef1} autoPlay loop muted playsInline key={0}>
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
            clipPath: `circle(${clipSize}vw at ${mousePos.x}px ${mousePos.y}px)
            `,
          }}
        >
          <source src={`/video/superposition/${VID_ARR[1]}`} type="video/mp4" />
        </S.StyledVideo>
      </S.VideoWrapper>
    </S.Container>
  );
}