"use client";
import * as S from "./styles";

import GPGPUParticles from "./Particles";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";

export default function Container() {
  return (
    <S.Container>
      <Canvas
        gl={{ antialias: true }}
        //camera location
        camera={{ position: [0, 0, 3] }}
      >
        <ambientLight />

        {/* <OrbitControls /> */}
        <GPGPUParticles />
      </Canvas>
    </S.Container>
  );
}
