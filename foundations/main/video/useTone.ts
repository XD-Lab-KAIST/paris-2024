import { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";

const CODES = ["C", "E", "G"];

function numberToNote(n: number) {
  const octave = Math.floor(n / 3) + 1;
  const note = CODES[n % 3];
  return `${note}${octave}`;
}

export default function useTone({ videoIdx, cycleIdx, uiState }: any) {
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

  useEffect(() => {
    try {
      if (uiState === 4) {
        if (!synth) return;
        const now = Tone.now();

        // for (let i = 0; i < 7; i++) {
        //   synth.triggerAttackRelease(`C${i + 1}`, 0.5, now + 0.05 * i);
        // }
        synth.triggerAttackRelease("C7", 1, now);
      }
    } catch (e) {
      console.log(e);
    }
  }, [uiState, synth]);
}
