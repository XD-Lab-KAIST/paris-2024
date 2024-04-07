import * as S from "./styles";
import { useState, useEffect, useMemo } from "react";

const TEXTS = ["Move Around Trackpad", "Click to Enter", "Scroll Down", "Scroll Down"];

export default function Intro({ isIntro, setIsIntro, setUIState }: any) {
  const [shownLetters, setShownLetters] = useState(0);

  //if shownletters is equal to the length of the string, then set isIntro to false
  useEffect(() => {
    if (shownLetters === "Uncharted Territory".length) {
      setUIState(1);
    }
  }, [shownLetters]);

  return (
    <S.Intro
      onClick={() => {
        setIsIntro(false);
        setUIState(2);
      }}
      style={{
        opacity: isIntro ? 1 : 0,
        pointerEvents: isIntro ? "all" : "none",
      }}
    >
      <h1>
        {"Uncharted Territory".split("").map((letter: string, idx: number) => (
          <Item key={idx} letter={letter} showed={() => setShownLetters((s) => s + 1)} />
        ))}
      </h1>
    </S.Intro>
  );
}

function Item({ letter, showed }: any) {
  const [show, setShow] = useState(false);

  return (
    <span
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s",
      }}
      onMouseEnter={() => {
        setShow(true);
        showed();
      }}
    >
      {letter}
    </span>
  );
}
