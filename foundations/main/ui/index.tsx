import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";
import Sidebar from "./sidebar";
import Credits from "./credits";
import { useMousePosThrottle } from "@/utils/hooks/useMousePos";

const TEXTS = ["TOUCH THE PAD TO START", "Click to Enter", "Drag with two fingers to scroll", "Drag with two fingers to scroll", "Move around the Trackpad"];

const RESET_SEC = 1000;

export default function UI({ uiState, handleReset }: any) {
  const targetText = useMemo(() => TEXTS[uiState], [uiState]);
  const [isChanging, setIsChanging] = useState(false);
  const [displayText, setDisplayText] = useState("TOUCH THE PAD TO START");

  useEffect(() => {
    if (uiState !== 0) setIsChanging(true);
    const timeout1 = setTimeout(() => {
      setDisplayText(targetText);
    }, 500);
    const timeout2 = setTimeout(() => {
      setIsChanging(false);
    }, 800);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [targetText]);

  const scrollTimeoutRef = useRef<any>(null);
  const resetRef = useRef<any>(null);

  const mousePos = useMousePosThrottle();

  useEffect(() => {
    //scrolling detection: when scrolling ischanging true, when not scrolling for more than 10s ischanging false
    //focus on performance
    if (uiState === 3) {
      const handleScroll = () => {
        setIsChanging(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsChanging(false);
        }, 10 * 1000);

        if (resetRef.current) clearTimeout(resetRef.current);

        resetRef.current = setTimeout(() => {
          handleReset();
        }, RESET_SEC * 1000);
      };

      document.addEventListener("wheel", handleScroll);
      return () => {
        document.removeEventListener("wheel", handleScroll);
      };
    }
  }, [uiState]);

  useEffect(() => {
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => {
      handleReset();
    }, RESET_SEC * 1000);
  }, [mousePos]);

  const [showCredits, setShowCredits] = useState(false);

  console.log(uiState);

  return (
    <>
      <S.UIContainer
        style={
          {
            // cursor: uiState >= 3 ? "pointer !important" : "none",
          }
        }
      >
        <S.UIText
          style={{
            opacity: isChanging ? 0 : 1,
            transform: isChanging ? "translateY(10px)" : "translateY(0)",
            transition: "all 0.5s",
          }}
        >
          {displayText}
        </S.UIText>
        <Sidebar />
      </S.UIContainer>

      {uiState === 4 && (
        <>
          <S.InfoIcon
            onClick={() => {
              setShowCredits((t) => !t);
            }}
            style={{
              left: "2vw",
            }}
          >
            <img src="/logos/info_white.svg" />
            <p>Info</p>
          </S.InfoIcon>
          <S.InfoIcon
            onClick={() => handleReset(100)}
            style={{
              right: "2vw",
            }}
          >
            <img src="/logos/home.svg" />
            <p>Home</p>
          </S.InfoIcon>
          <Credits showCredits={showCredits} setShowCredits={setShowCredits} setIsChanging={setIsChanging} />
        </>
      )}
    </>
  );
}
