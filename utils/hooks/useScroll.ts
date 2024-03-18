import { useState, useEffect, useRef } from "react";
import useResize from "./useResize";

export default function useScroll(containerRef: any) {
  const [listenToScroll, setListenToScroll] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [_, windowHeight] = useResize();
  const windowHeightRef = useRef(windowHeight);

  useEffect(() => {
    windowHeightRef.current = windowHeight;
  }, [windowHeight]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      setScroll(scrollTop / windowHeightRef.current);
    };

    if (!containerRef.current) return;
    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (!containerRef.current) return;
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //detect scroll by touchpad
  const cancelTimeRef: any = useRef(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setListenToScroll(true);

      if (cancelTimeRef.current) {
        clearTimeout(cancelTimeRef.current);
      }
      cancelTimeRef.current = setTimeout(() => {
        setListenToScroll(false);

        if (cancelTimeRef.current) {
          clearTimeout(cancelTimeRef.current);
        }
      }, 100);
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { scroll, listenToScroll };
}
