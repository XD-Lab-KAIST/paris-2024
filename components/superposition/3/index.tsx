"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import useResize from "@/utils/hooks/useResize";
import * as S from "./styles";
 
// const VID_ARR = ["color.mp4", "wireframe.mp4"];
const VID_ARR = ["wireframe.mp4", "color.mp4"];
const SINGLE_CYLCE = 4;
const SPEED = 30; // percent per second
const MIN_RADIUS = 2;
const INIT_RADIUS = 15;
const MAX_RADIUS = 90;
const SPEED_MULTIPLIER = 1.2;
const SPEED_MAX = 2000;
const SPEED_MAX_LOOPS = 10;

const IntroComponent = ({ onEnter, isExiting }: { onEnter: () => void; isExiting: boolean }) => {
  return (
    <S.IntroContainer onClick={onEnter} isExiting={isExiting}>
      <S.EnterButton isExiting={isExiting}>START</S.EnterButton>
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

function useMouseDownCount({ isStarted }: { isStarted: boolean }) {
  const [mouseDownCount, setMouseDownCount] = useState(0);
  useEffect(() => {
    const handleMouseDown = () => {
      if (isStarted) {
        setMouseDownCount((prev) => prev + 1);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseDown);
    };
  }, [isStarted]);
  return mouseDownCount;
}

export default function MainComp() {
  const [showIntro, setShowIntro] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isExitingIntro, setIsExitingIntro] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [radius, setRadius] = useState<number>(INIT_RADIUS);
  const [currentSpeed, setCurrentSpeed] = useState(SPEED);
  const [maxSpeedLoopCount, setMaxSpeedLoopCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const mousePos = useMousePosition();
  const mouseDownCount = useMouseDownCount({ isStarted });

  useEffect(() => {
    const onDown = () => {
      if (!isStarted) {
        return;
      }
      setIsMouseDown(true);
    };
    const onUp = () => {
      setIsMouseDown(false);
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isStarted]);

  useEffect(() => {
    const phase = mouseDownCount % SINGLE_CYLCE;
    const isIncreasing = phase === 1;
    const isDecreasing = phase === 3;
    const shouldAnimate = isMouseDown && (isIncreasing || isDecreasing);

    if (!shouldAnimate) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setRadius((prev) => {
        const delta = currentSpeed * dt * (isIncreasing ? 1 : -1);
        let next = prev + delta;

        if (next < MIN_RADIUS) {
          next = MAX_RADIUS;
          setCurrentSpeed((s) => {
            if (s >= SPEED_MAX) {
              const nextCount = maxSpeedLoopCount + 1;
              if (nextCount >= SPEED_MAX_LOOPS) {
                setMaxSpeedLoopCount(0);
                return SPEED;
              }
              setMaxSpeedLoopCount(nextCount);
              return s;
            }
            const nextSpeed = s * SPEED_MULTIPLIER;
            return Math.min(SPEED_MAX, nextSpeed);
          });
        } else if (next > MAX_RADIUS) {
          next = MIN_RADIUS;
          setCurrentSpeed((s) => {
            if (s >= SPEED_MAX) {
              const nextCount = maxSpeedLoopCount + 1;
              if (nextCount >= SPEED_MAX_LOOPS) {
                setMaxSpeedLoopCount(0);
                return SPEED;
              }
              setMaxSpeedLoopCount(nextCount);
              return s;
            }
            const nextSpeed = s * SPEED_MULTIPLIER;
            return Math.min(SPEED_MAX, nextSpeed);
          });
        }

        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [isMouseDown, mouseDownCount, currentSpeed, maxSpeedLoopCount]);

  
  const handleEnter = useCallback(() => {
    console.log("handleEnter called. isStarted:", isStarted);
    if (isStarted) {
      console.log("handleEnter blocked: already started.");
      return;
    }

    setIsExitingIntro(true); // Start fade out
    setIsStarted(true); // Start fade in and enable interactions

    setTimeout(() => {
      setShowIntro(false); // Remove from DOM after animation
    }, 10 * 1000);

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


  //to do: 파동 함수. Big cycle, small cycle.
  const optionGenerator = () => {
    let r = radius;


    let edge = Math.min(100, r  ** 1.07);
    if(mouseDownCount % 4 === 0) {
      r = radius/ 2;
      edge = Math.min(100, radius * 1.5);
    } else if(mouseDownCount % 4 === 1) {
      r = radius;
      edge = Math.min(100, Math.min(radius * 1.4, radius ** 1.05));
    }
    if(mouseDownCount % 4 === 2 ) {
      r = radius ** 1.05;
      edge = Math.min(100, radius  ** 1.28);
    } else if(mouseDownCount % 4 === 3) {
      edge = Math.min(100, radius  ** 1.2);
    }
    
    return `white 0%, white ${r}%, transparent ${edge}%`;
  }


  return (
    <S.Container>
      {showIntro && <IntroComponent onEnter={handleEnter} isExiting={isExitingIntro} />}
      <S.VideoWrapper isStarted={isStarted}>
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
            }px, ${optionGenerator()})`,
            // No transition for rAF updates
            filter:
            // mouseDownCount % 4 === 0 || mouseDownCount % 4 === 1
            // ? "grayscale(100%)" : "none",
              mouseDownCount % 4 === 0
                ? "grayscale(100%)"
                : (mouseDownCount % 4 === 1 || mouseDownCount % 4 === 3)
                ? "invert(1)"
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