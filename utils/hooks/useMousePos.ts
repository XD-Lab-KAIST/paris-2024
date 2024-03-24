//use mouse pos
import { useState, useEffect } from "react";
import useResize from "./useResize";

export default function useMousePos() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
  }, []);

  return mousePos;
}
