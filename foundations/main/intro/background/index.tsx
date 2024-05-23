import * as S from "./styles";
import MovingGradient from "./MovingGradient";

export default function Background({ isIntro, fadeOut }: any) {
  return (
    <S.Background
      style={{
        opacity: isIntro ? 1 : 0,
      }}
    >
      <S.CanvasStyle
        style={{
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <MovingGradient />
      </S.CanvasStyle>
    </S.Background>
  );
}
