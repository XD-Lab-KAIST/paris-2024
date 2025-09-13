import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";

export default function Loading({ handleIntroClick }: { handleIntroClick: (e: React.MouseEvent) => void }) {
  const [show, setShow] = useState(true);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (handleIntroClick) {
      handleIntroClick(e);
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <S.Container onClick={handleClick}>
      <S.Button>▶</S.Button>
    </S.Container>
  );
}
