"use client";
import * as S from "./styles";

import GPGPUParticles from "@/foundations/particles";
import { Canvas } from "@react-three/fiber";
import useMousePos from "@/utils/hooks/useMousePos";

export default function Container() {
  return (
    <S.Container>
      <Canvas
        gl={{ antialias: true }}
        //camera location
        camera={{ position: [0, 0, 3] }}
      >
        <ambientLight />
        <GPGPUParticles />
      </Canvas>
      <MouseTrackingEl />
    </S.Container>
  );
}

function MouseTrackingEl() {
  const mousePos = useMousePos();
  console.log(mousePos);

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
