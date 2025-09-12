"use client";

import { useControls } from "leva";
import { useRef, useState, useEffect } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";
 
const VID_ARR = ["color.mp4", "wireframe.mp4"];


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

  const { speed } = useControls({
    speed: { value: 1.0, min: 0.3, max: 4, step: 0.1 },
  });

  useEffect(() => {
    if (isMouseDown) {
      //play twice the speed
      videoRef1.current?.play();
      videoRef2.current?.play();
      videoRef1.current!.playbackRate = speed;
      videoRef2.current!.playbackRate = speed;
    } else {
      videoRef1.current?.play();
      videoRef2.current?.play(); 
      videoRef1.current!.playbackRate = 1;
      videoRef2.current!.playbackRate = 1;
    }
  }, [isMouseDown, speed]);

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