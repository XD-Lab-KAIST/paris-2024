import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export default function Loading({ handleIntroClick }: { handleIntroClick: () => void }) {
  const [step, setStep] = useState(0); // 0: button, 1: loading, 2: done
  const [isLoading, setIsLoading] = useState(true);

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  function handleClick() {
    if (handleIntroClick) {
      handleIntroClick();
    }
    setStep(1);
  }

  //interval every 0.3s increase 10
  const intervalRef = useRef<any>(null);
  useEffect(() => {
    if (step === 1) {
      intervalRef.current = setInterval(() => {
        setLoadingPercentage((p) => Math.min(p + getRandomInt(12), 100));
      }, 150);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [step]);

  useEffect(() => {
    if (loadingPercentage >= 100) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setStep(2);
      // Let the fade-out animation play
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [loadingPercentage]);

  return (
    <S.Container
      onClick={step === 0 ? handleClick : undefined}
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        cursor: step === 0 ? "pointer" : "default",
      }}
    >
      {step === 0 && (
        <S.Button>
          START
          <br />
          시작
        </S.Button>
      )}
      {step === 1 && (
        <S.LoadingBar>
          <S.InnerBar
            style={{
              width: `${loadingPercentage}%`,
            }}
          />
          <S.Text>{loadingPercentage}%</S.Text>
        </S.LoadingBar>
      )}
    </S.Container>
  );
}
