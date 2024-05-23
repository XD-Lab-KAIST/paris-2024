import * as S from "./styles";
import MovingGradient from "./MovingGradient";

export default function Background({ uiState, isIntro }: any) {
  return (
    <S.Background>
      <MovingGradient uiState={uiState} />
    </S.Background>
  );
}
