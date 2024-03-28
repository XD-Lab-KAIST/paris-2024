import React, { forwardRef, useRef, useState, useEffect, useMemo, useCallback } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";

const INTERVAL = 0.0008;
const FONT_PATH = "/fonts/Roboto_Regular.json";

const TEXTS = [
  {
    text: "Tears",
    show: 0.295,
    fontSize: 0.8,
    position: [0, 1, 2],
  },
  {
    text: "Environment",
    show: 0.3,
    fontSize: 0.5,
    position: [0, 0, 0],
  },
  {
    text: "Trash",
    show: 0.29,
    fontSize: 0.8,
    position: [-1, 0, -0.5],
  },

  { text: "Recycling", show: 0.311, fontSize: 0.7, position: [0.69, -0.61, -0.88] },
  { text: "Biodiversity", show: 0.278, fontSize: 0.6, position: [-0.06, 0.85, 0.2] },
  { text: "Climate Change", show: 0.351, fontSize: 0.9, position: [-0.17, -0.18, -0.02] },
  { text: "Recycling", show: 0.335, fontSize: 0.8, position: [-0.23, 0.27, 0.85] },
  { text: "Deforestation", show: 0.345, fontSize: 0.6, position: [0.21, 0.15, -0.29] },
  { text: "Clean Water", show: 0.286, fontSize: 0.7, position: [0.07, -0.29, 0.83] },
  { text: "Sustainability", show: 0.303, fontSize: 0.8, position: [-0.13, 0.45, 0.94] },
  { text: "Eco-Friendly", show: 0.359, fontSize: 0.5, position: [0.51, 0.91, -0.74] },
  { text: "Pollution", show: 0.299, fontSize: 0.7, position: [0.53, -0.11, -0.85] },
  { text: "Conservation", show: 0.284, fontSize: 0.9, position: [0.92, 0.65, 0.34] },
  { text: "Recycling", show: 0.315, fontSize: 0.6, position: [-0.64, -0.36, -0.43] },
  { text: "Eco-Friendly", show: 0.362, fontSize: 0.5, position: [-0.98, -0.61, -0.72] },
  { text: "Biodiversity", show: 0.306, fontSize: 0.6, position: [0.12, 0.19, 0.85] },
  { text: "Clean Water", show: 0.274, fontSize: 0.8, position: [-0.92, 0.44, -0.98] },
  { text: "Sustainability", show: 0.339, fontSize: 0.6, position: [0.65, -0.5, 0.16] },
  { text: "Conservation", show: 0.321, fontSize: 0.8, position: [0.27, -0.24, 0.28] },
  { text: "Pollution", show: 0.351, fontSize: 0.5, position: [0.38, 0.99, -0.63] },
  { text: "Deforestation", show: 0.355, fontSize: 0.7, position: [0.14, 0.79, -0.04] },
  { text: "Climate Change", show: 0.362, fontSize: 0.8, position: [0.47, 0.06, -0.91] },
  { text: "Recycling", show: 0.345, fontSize: 0.9, position: [0.67, 0.19, -0.5] },
  { text: "Eco-Friendly", show: 0.332, fontSize: 0.7, position: [-0.77, -0.39, 0.03] },
  { text: "Biodiversity", show: 0.281, fontSize: 0.5, position: [0.19, 0.33, -0.06] },
  { text: "Sustainability", show: 0.319, fontSize: 0.5, position: [-0.4, -0.65, 0.77] },
];

export default function Text({ scrollPos }: any) {
  const showText1 = useMemo(() => scrollPos >= 0.299 && scrollPos <= 0.301, [scrollPos]);

  const showOn = useCallback(
    (loc: number) => {
      return scrollPos >= loc - INTERVAL && scrollPos <= loc + INTERVAL;
    },
    [scrollPos]
  );

  return (
    <>
      <Center>
        {TEXTS.map((el, i) => (
          <>
            {showOn(el.show) && (
              <Text3D key={i} scale={el.fontSize} position={el.position} font={FONT_PATH}>
                {el.text}
              </Text3D>
            )}
          </>
        ))}
      </Center>
    </>
  );
}
