import * as S from "./styles";
import { useState, useEffect, useMemo } from "react";
import useMousePos from "@/utils/hooks/useMousePos";

import Background from "./background";
import Loading from "./loading";

export default function Intro({ isIntro, setIsIntro, uiState, setUIState, handleIntroClick }: any) {
  const [shownLetters, setShownLetters] = useState(0);

  //if shownletters is equal to the length of the string, then set isIntro to false
  useEffect(() => {
    if (shownLetters >= "Uncharted Territory".length - 2) {
      setUIState(1);
    }
  }, [shownLetters]);
  const [fadeOut, setFadeOut] = useState(false);

  function handleClick() {
    setTimeout(() => {
      setFadeOut(true);
    }, 200);
    setTimeout(() => {
      setIsIntro(false);
      setUIState(2);
    }, 1800);
  }

  return (
    <>
      <Background isIntro={isIntro} fadeOut={fadeOut} />
      <S.Intro
        onClick={handleClick}
        style={{
          opacity: isIntro ? 1 : 0,
          pointerEvents: isIntro ? "all" : "none",
          cursor: uiState === 1 ? "pointer" : "none",
        }}
      >
        <h1>
          {"Uncharted Territory".split("").map((letter: string, idx: number) => (
            <Item fadeOut={fadeOut} idx={idx} key={idx} letter={letter} showed={() => setShownLetters((s) => s + 1)} />
          ))}
        </h1>
        <MouseTrackingEl />
      </S.Intro>
      {isIntro && <Loading handleIntroClick={handleIntroClick} />}
    </>
  );
}

function MouseTrackingEl() {
  const mousePos = useMousePos();

  return (
    <>
      <S.MouseEl
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
      />
    </>
  );
}

function Item({ fadeOut, idx, letter, showed }: any) {
  const [show, setShow] = useState(false);
  const [textShadow, setTextShadow] = useState(true);

  useEffect(() => {
    let timeout: any = null;
    if (fadeOut) {
      const timeout = setTimeout(() => {
        setShow(false);
        setTextShadow(false);
      }, idx * 50);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [fadeOut]);

  useEffect(() => {
    if (show) {
      showed();
    }
  }, [show]);

  return (
    <>
      <span
        style={{
          opacity: show ? 1 : 0.4,
          // transform: show ? "translateY(0)" : "translateY(100%)",
          color: show ? "white" : "black",
          textShadow: show ? "none" : textShadow ? "0px 0px .5vw rgba(255, 255, 255, 0.6)" : "none",
        }}
        onMouseEnter={() => {
          setTimeout(() => {
            setShow(true);
          }, 250);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        {letter}
      </span>
    </>
  );
}
