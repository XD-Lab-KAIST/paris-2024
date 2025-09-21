import * as S from "./styles";
import MovingGradient from "./MovingGradient";
import { useState, useEffect } from "react";

export default function Background({ isIntro, fadeOut }: any) {
  const [cancelGradientEl, setCancleGradientEl] = useState(false);

  useEffect(() => {
    if (!isIntro) {
      //after 4s
      const timeout = setTimeout(() => {
        setCancleGradientEl(true);
      }, 4000);

      return () => clearTimeout(timeout);
    } else {
      setCancleGradientEl(false);
    }
  }, [isIntro]);

  return (
    <S.Background
      style={{
        opacity: isIntro ? 1 : 0,
      }}
    >
      <S.CanvasStyle
        style={{
          opacity: fadeOut ? 0 : 1,
          transitionDelay: "0.3s",
          transitionDuration: '3s'
        }}
      >
        {!cancelGradientEl && <MovingGradient />}
      </S.CanvasStyle>
    </S.Background>
  );
}
