import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud, Sky } from "@react-three/drei";
import * as THREE from "three";

const ENVIRONMENTS_ARR = [
  "apartment",
  "city",
  "dawn",
  "forest",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse",
  "apartment",
  "city",
  "dawn",
  "forest",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse",
];

export default function SkyAndStars({ scrollPos }: any) {
  const [group, earth] = useRefs<any>();

  useEffect(() => {
    if (group.current && group.current.material) {
      group.current.material.opacity = 1 - scrollPos * 5;
    }
  }, [scrollPos]);

  const envArrIdx = useMemo(() => Math.min(Math.floor((scrollPos - 1 / 4) * 16 * ENVIRONMENTS_ARR.length), ENVIRONMENTS_ARR.length - 1), [scrollPos]);

  return (
    <>
      <group>
        {scrollPos < 0.056 && (
          <Sky
            inclination={1 - scrollPos * 10} // Sun elevation (default=0)
            sunPosition={[scrollPos * 1000, 100 - scrollPos * 2000, -300]}
            opacity={1 - scrollPos * 5}
          />
        )}
      </group>

      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade animated />
      {scrollPos >= 1 / 4 && <Environment preset={ENVIRONMENTS_ARR[envArrIdx]} />}
      {/* {scrollPos >= 0.056 && <Sparkles count={100} colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]} size={1} fade animated fadeOut />} */}
    </>
  );
}
