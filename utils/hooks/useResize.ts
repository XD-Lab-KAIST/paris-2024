import React, { useState, useEffect, useCallback, useMemo } from "react";

export default function useResize() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    setWindowHeight(documentClientWidth > 768 ? documentClientHeight : window.innerHeight);
    setWindowWidth(documentClientWidth);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return [windowWidth, windowHeight];
}
