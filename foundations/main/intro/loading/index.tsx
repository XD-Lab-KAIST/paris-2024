import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

export default function Loading({ handleIntroClick, showPlayButton, setShowPlayButton }: { handleIntroClick: (e: React.MouseEvent) => void, showPlayButton: boolean, setShowPlayButton: (show: boolean) => void }) {
  const [show, setShow] = useState(true);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (handleIntroClick) {
      handleIntroClick(e);
    }
    setShow(false);
    setShowPlayButton(false);
  }

  if (!show) return null;

  return (
    <S.Container onClick={handleClick}>
      <S.Button>▶</S.Button>
    </S.Container>
  );
}
