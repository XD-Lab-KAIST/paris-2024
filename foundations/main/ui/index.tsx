import * as S from "./styles";
import { useState, useEffect, useMemo } from "react";

const TEXTS = ["Move Around Trackpad", "Click to Enter", "Scroll Down", "Scroll Down"];

export default function UI({ uiState }: any) {
  const targetText = useMemo(() => TEXTS[uiState], [uiState]);
  const [displayText, setDisplayText] = useState("Move Around Trackpad");

  //when targettext changes, gradually move the displaytext to targettext
  //for example: current displayText 'Apple', transition to 'Banana'
  //Apple -> Aaple -> Baple -> Banle -> Banana

  useEffect(() => {
    if (displayText !== targetText) {
      // Calculate the total time based on the length difference, ensuring it's between 1s and 2s.
      let totalTime = Math.min(Math.max(Math.abs(targetText.length - displayText.length) * 100, 1000), 2000);
      let currentIndex = 0;

      // Calculate the time interval for updating each character.
      let intervalTime = totalTime / Math.max(targetText.length, displayText.length);

      // Clear existing interval if any.
      const interval = setInterval(() => {
        // Determine the next display text by either adding or trimming characters.
        const nextDisplayText = targetText.slice(0, currentIndex + 1) || "";
        setDisplayText(nextDisplayText);
        currentIndex++;

        // If the entire text is displayed, clear the interval.
        if (nextDisplayText === targetText) {
          clearInterval(interval);
        }
      }, intervalTime);

      // Clean up the interval on component unmount or when the targetText changes again.
      return () => clearInterval(interval);
    }
  }, [targetText, displayText]);

  return (
    <S.UIContainer>
      <S.UIText>{displayText}</S.UIText>
    </S.UIContainer>
  );
}
