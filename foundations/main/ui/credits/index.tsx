import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";
import useMousePos from "@/utils/hooks/useMousePos";

const TEXT = `This work is a web-based interactive artwork that symbolically represents various aspects of the Anthropocene. It unfolds themes symbolic of the Anthropocene such as drought, wildfires, and the Holocene extinction, allowing audiences to interact with and relate to the narrative of the artwork by manipulating the Earth. Although the interaction with the artwork can be intuitive and playful through a simple UI, the scenes that unfold are dreamlike yet sorrowful. Humanity has indiscriminately exploited the Earth as if it were an object to be used, but as a result, we are living in a state of high instability and uncertainty. By interacting with this work, we hope viewers will imagine what the Earth might look like if we do not make an effort, placing it in uncharted territory.`;

export default function Credits({ showCredits = true, setShowCredits = () => {} }: any) {
  return (
    <S.Container
      style={{
        opacity: showCredits ? 1 : 0,
        pointerEvents: showCredits ? "auto" : "none",
      }}
    >
      <S.Section>
        <h1>
          {"Uncharted Territory".split("").map((letter: string, idx: number) => (
            <Item key={idx} letter={letter} />
          ))}
        </h1>
        <p style={{ marginTop: "6vw" }}>Experience Design Lab, ID KAIST</p>
        <p>Yiyun Kang, Jeanyoon Choi</p>
      </S.Section>
      <S.Section>{TEXT}</S.Section>

      <S.Cancel
        onClick={() => {
          setShowCredits(false);
        }}
      >
        X
      </S.Cancel>

      <MouseTrackingEl />
    </S.Container>
  );
}

function MouseTrackingEl() {
  const mousePos = useMousePos();

  return (
    <>
      <S.MouseEl
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
      />
    </>
  );
}

function Item({ letter }: any) {
  const [show, setShow] = useState(false);

  return (
    <span
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(100%)",
      }}
      onMouseEnter={() => {
        setTimeout(() => {
          setShow(true);
        }, 50);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {letter}
    </span>
  );
}
