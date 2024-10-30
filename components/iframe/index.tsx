"use client";

import { useState } from "react";
import * as S from "./styles";

const LINK = "https://uncharted-territory-xdlab.vercel.app/";

export default function MainComp() {
  // const [heightVh, setHeightVh] = useState(54.7);
  // const [topVh, setTopVh] = useState(5.1);
  // const [widthVw, setWidthVw] = useState(78.9);
  // const [leftVw, setLeftVw] = useState(6.2);

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
      <S.DebugControls>
        <div>
          <label>Height (vh): {heightVh}</label>
          <input type="range" min="0" max="100" step="0.1" value={heightVh} onChange={(e) => setHeightVh(Number(e.target.value))} />
        </div>
        <div>
          <label>Top Position (vh): {topVh}</label>
          <input type="range" min="0" max="100" step="0.1" value={topVh} onChange={(e) => setTopVh(Number(e.target.value))} />
        </div>
        <div>
          <label>Width (vw): {widthVw}</label>
          <input type="range" min="0" max="100" step="0.1" value={widthVw} onChange={(e) => setWidthVw(Number(e.target.value))} />
        </div>
        <div>
          <label>Left Position (vw): {leftVw}</label>
          <input type="range" min="0" max="100" step="0.1" value={leftVw} onChange={(e) => setLeftVw(Number(e.target.value))} />
        </div>
      </S.DebugControls>
    </S.Wrapper>
  );
}
