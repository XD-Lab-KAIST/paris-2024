"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";

const VID_ARR = ["color.mp4", "wireframe.mp4"];

const GRID_COLS = 30;
const GRID_ROWS = 30;

const initialMask = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

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

export default function MainComp() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskDataURL, setMaskDataURL] = useState<string>(initialMask);
  const gridRef = useRef<boolean[][]>([]);

  const mousePos = useMousePosition();
  const [windowWidth, windowHeight] = useResize();

  const drawMask = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas || !windowWidth || !windowHeight) return;
  
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      // Redraw the entire mask from the grid state.
      const cellWidth = windowWidth / GRID_COLS;
      const cellHeight = windowHeight / GRID_ROWS;
      ctx.fillStyle = 'white';
  
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          if (gridRef.current[row] && gridRef.current[row][col]) {
            ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
          }
        }
      }
  
      setMaskDataURL(canvas.toDataURL());
    }, [windowWidth, windowHeight]);

  // Initialize and redraw grid mask on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !windowWidth || !windowHeight) return;

    canvas.width = windowWidth;
    canvas.height = windowHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (gridRef.current.length === 0) {
      gridRef.current = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(false));
    }

    ctx.clearRect(0, 0, windowWidth, windowHeight);
    drawMask();

  }, [windowWidth, windowHeight, drawMask]);

  // Handle mouse move to reveal cells
  useEffect(() => {
    if (!windowWidth || !windowHeight || gridRef.current.length === 0) return;

    const cellWidth = windowWidth / GRID_COLS;
    const cellHeight = windowHeight / GRID_ROWS;
    
    const col = Math.floor(mousePos.x / cellWidth);
    const row = Math.floor(mousePos.y / cellHeight);

    if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
      if (!gridRef.current[row][col]) {
        gridRef.current[row][col] = true;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        // ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);

        //draw a circle
        ctx.beginPath();
        ctx.arc(col * cellWidth + cellWidth / 2, row * cellHeight + cellHeight / 2, cellWidth , 0, 2 * Math.PI);
        ctx.fill();

        
        setMaskDataURL(canvas.toDataURL());
      }
    }
  }, [mousePos, windowWidth, windowHeight]);
  
  // Handle audio mute/unmute
  useEffect(() => {
    const handleClick = () => {
      if (videoRef1.current) videoRef1.current.muted = false;
      if (videoRef2.current) videoRef2.current.muted = false;
      window.removeEventListener("click", handleClick);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
            WebkitMaskImage: `url(${maskDataURL})`,
            maskImage: `url(${maskDataURL})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          <source src={`/video/superposition/${VID_ARR[1]}`} type="video/mp4" />
        </S.StyledVideo>
      </S.VideoWrapper>
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          visibility: 'hidden',
          zIndex: -1
        }}
      />
    </S.Container>
  );
}
