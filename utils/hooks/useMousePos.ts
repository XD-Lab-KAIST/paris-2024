//use mouse pos
import { useState, useEffect } from "react";
import useResize from "./useResize";

export default function useMousePos() {
  const [mousePos, setMousePos] = useState({ x: -0.5, y: -0.5 });
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (windowHeight === 0 || windowWidth === 0) return;
      setMousePos({ x: e.clientX / windowWidth, y: e.clientY / windowHeight });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowWidth, windowHeight]);

  return mousePos;
}

//track mouse pos only every 400ms
export function useMousePosThrottle() {
  const [mousePos, setMousePos] = useState({ x: -0.5, y: -0.5 });
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    let timeout: any;
    function handleMouseMove(e: MouseEvent) {
      if (windowHeight === 0 || windowWidth === 0) return;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMousePos({ x: e.clientX / windowWidth, y: e.clientY / windowHeight });
      }, 500);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowWidth, windowHeight]);

  return mousePos;
}
