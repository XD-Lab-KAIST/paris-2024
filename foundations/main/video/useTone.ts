import { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";

export default function useTone({ videoIdx, cycleIdx }: any) {
  const synth = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Tone.MembraneSynth().toDestination();
      // your code that uses synth here
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    try {
      if (!synth) return;
      if (videoIdx >= 0) {
        //simple video changing sound, depencing on the video index
        const code = cycleIdx >= 5 ? `C2` : `C1`;
        const time = cycleIdx >= 5 ? 0.2 : 0.1;
        synth.triggerAttackRelease(code, time);
      }
    } catch (e) {
      console.log(e);
    }
  }, [videoIdx, cycleIdx, synth]);
}
