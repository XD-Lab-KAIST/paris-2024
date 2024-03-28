import React, { forwardRef, useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";

const INTERVAL = 0.0005;
const FONT_PATH = "/fonts/Roboto_Regular.json";

import { textGenerator, TEXTS } from "./constant";

export default function Text({ scrollPos }: any) {
  // textGenerator();

  const showOn = useCallback(
    (loc: number) => {
      return scrollPos >= loc - INTERVAL && scrollPos <= loc + INTERVAL;
    },
    [scrollPos]
  );

  const { viewport } = useThree();

  return (
    <>
      {TEXTS.map((el, i) => (
        <>
          {showOn(el.show) && (
            <Center key={i} position={[el.position[0] * viewport.width * 0.3, el.position[1] * viewport.height * 0.3, el.position[2] * viewport.width * 0.1]}>
              <Text3D
                color={new THREE.Color(1, 1, 0)}
                scale={el.fontSize * 0.3}
                // position={[0.1 * viewport.width, 0, 0]}
                rotation={[0, 0, 0]}
                position={[el.position[0] * viewport.width * 0.3, el.position[1] * viewport.height * 0.7, el.position[2] * viewport.width * 0.3]}
                font={FONT_PATH}
              >
                {el.text}
                <meshPhongMaterial attach="material" />
              </Text3D>
            </Center>
          )}
        </>
      ))}
    </>
  );
}
