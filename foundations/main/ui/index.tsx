import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

const TEXTS = ["Move Around Trackpad", "Click to Enter", "Scroll Down", "Scroll Down"];

export default function UI({ uiState }: any) {
  const targetText = useMemo(() => TEXTS[uiState], [uiState]);
  const [isChanging, setIsChanging] = useState(false);
  const [displayText, setDisplayText] = useState("Move Around Trackpad");

  useEffect(() => {
    if (targetText !== "Move Around Trackpad") setIsChanging(true);
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

  useEffect(() => {
    //scrolling detection: when scrolling ischanging true, when not scrolling for more than 10s ischanging false
    //focus on performance

    const handleScroll = () => {
      console.log("32");
      setIsChanging(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsChanging(false);
      }, 10000);
    };

    document.addEventListener("wheel", handleScroll);

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <S.UIContainer>
      <S.UIText
        style={{
          opacity: isChanging ? 0 : 1,
          transform: isChanging ? "translateY(10px)" : "translateY(0)",
          transition: "all 0.5s",
        }}
      >
        {displayText}
      </S.UIText>
    </S.UIContainer>
  );
}
