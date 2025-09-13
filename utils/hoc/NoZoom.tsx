"use client";

import { useEffect } from "react";

export default function NoZoom() {
  useEffect(() => {
    const preventZoom = (e: Event) => {
      if ((e as WheelEvent).ctrlKey) {
        e.preventDefault();
      }
    };

    const preventTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("touchmove", preventTouchZoom, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("touchmove", preventTouchZoom);
    };
  }, []);

  return null;
}
