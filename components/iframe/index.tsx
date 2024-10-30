"use client";

import { useState } from "react";
import * as S from "./styles";

const LINK = "https://uncharted-territory-xdlab.vercel.app/";

export default function MainComp() {
  const [heightVh, setHeightVh] = useState(50);
  const [topVh, setTopVh] = useState(25);

  return (
    <S.Wrapper>
      <S.IFrame src={LINK} frameBorder="0" style={{ height: `${heightVh}vh`, top: `${topVh}vh` }} />
      <S.DebugControls>
        <div>
          <label>Height (vh): {heightVh}</label>
          <input type="range" min="0" max="100" value={heightVh} onChange={(e) => setHeightVh(Number(e.target.value))} />
        </div>
        <div>
          <label>Top Position (vh): {topVh}</label>
          <input type="range" min="0" max="100" value={topVh} onChange={(e) => setTopVh(Number(e.target.value))} />
        </div>
      </S.DebugControls>
    </S.Wrapper>
  );
}
