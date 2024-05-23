import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  //interval every 0.3s increase 10
  const intervalRef = useRef<any>(null);
  useEffect(() => {
    if (isLoading) {
      intervalRef.current = setInterval(() => {
        setLoadingPercentage((p) => Math.min(p + getRandomInt(12), 100));
      }, 150);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (loadingPercentage >= 100) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsLoading(false);
    }
  }, [loadingPercentage]);

  return (
    <S.Container
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
      }}
    >
      <S.LoadingBar>
        <S.InnerBar
          style={{
            width: `${loadingPercentage}%`,
          }}
        />
        <S.Text>{loadingPercentage}%</S.Text>
      </S.LoadingBar>
    </S.Container>
  );
}
