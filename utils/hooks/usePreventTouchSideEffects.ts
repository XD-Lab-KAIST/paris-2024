"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

///CHROME SETTINGS
//REFER TO https://therightstuff.medium.com/how-to-disable-brave-chrome-gestures-on-macos-b9a7b846b1e1#:~:text=On%20MacOS%20it's%20possible%20to,like%20it's%20done%20the%20trick!
//System Preferences --> Trackpad change window swipe action (MISSION CONTROL --> OFF)

export default function usePreventBackOnScroll() {
  useEffect(() => {
    document.addEventListener("touchstart", preventDefaultEvent, { passive: false });
    document.addEventListener("touchmove", preventDefaultEvent, { passive: false });
    document.addEventListener("touchend", preventDefaultEvent, { passive: false });
    document.addEventListener("wheel", preventDefaultEvent, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventDefaultEvent);
      document.removeEventListener("touchmove", preventDefaultEvent);
      document.removeEventListener("touchend", preventDefaultEvent);
      document.removeEventListener("wheel", preventDefaultEvent);
    };
  }, []);

  function preventDefaultEvent(e: any) {
    e.preventDefault();
  }
}
