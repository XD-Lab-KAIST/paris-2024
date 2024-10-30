"use client";

import { useState } from "react";
import * as S from "./styles";

const LINK = "https://uncharted-territory-xdlab.vercel.app/";

export default function MainComp() {
  const [heightVh, setHeightVh] = useState(55.5);
  const [topVh, setTopVh] = useState(5.1);
  const [widthVw, setWidthVw] = useState(78.9);
  const [leftVw, setLeftVw] = useState(6.1);

  return (
    <S.Wrapper>
      <S.IFrame
        src={LINK}
        frameBorder="0"
        style={{
          height: `${heightVh}vh`,
          top: `${topVh}vh`,
          width: `${widthVw}vw`,
          left: `${leftVw}vw`,
        }}
      />
    </S.Wrapper>
  );
}
