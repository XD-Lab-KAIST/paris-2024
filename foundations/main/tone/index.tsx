import * as Tone from "tone";
import { useContext, useMemo, useEffect } from "react";
import { ScrollContext } from "@/components/main";

const CODES_ARR = ["C", "D", "E", "F", "G", "A", "B"];
function numberToCode(number: any) {
  //0: C0, 1: D0, 2: E0, 3: F0, 4: G0, 5: A0, 6: B0
  //7: C1, 8: D1, 9: E1, 10: F1, 11: G1, 12: A1, 13: B1

  //given number (0 - 100) write converting code
  const convertedNumber = Math.floor(number * 600);

  const codeToReturn = `${CODES_ARR[Math.floor(convertedNumber % 7)]}${Math.floor(convertedNumber / 7)}`;
  return codeToReturn;
}

export default function ToneHandler() {
  const { scrollPos } = useContext(ScrollContext);

  const code = useMemo(() => (scrollPos > 0.9 && scrollPos < 1 ? numberToCode(scrollPos - 0.9) : "C0"), [scrollPos]);
  const synth = useMemo(() => new Tone.MembraneSynth().toDestination(), []);

  useEffect(() => {
    try {
      //scroll pos to according code

      synth.triggerAttackRelease(code, "16n");
    } catch (e) {
      console.log(e);
    }
  }, [code]);

  return <></>;
}
