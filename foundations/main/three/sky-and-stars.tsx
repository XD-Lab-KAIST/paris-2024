import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";
import useMousePos from "@/utils/hooks/useMousePos";

import * as THREE from "three";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud, Sky } from "@react-three/drei";

const START = 0.28;
const END = 0.577;

export default function SkyAndStars({ isIntro, scrollPos }: any) {
  const [group, cloud] = useRefs<any>();
  const { size } = useThree();

  useEffect(() => {
    if (scrollPos >= START && scrollPos <= END) {
      const pos = (scrollPos - START) * (1 / (END - START));
      cloud.current.position.x = -size.width * 0;
      cloud.current.position.y = 0;
      cloud.current.position.z = -1000 * Math.pow(1 - pos, 5) + 85;
      cloud.current.rotation.y = Math.PI * 0.5 * pos;
      cloud.current.rotation.z = Math.PI * 5 * pos;

      const scale = 1 + Math.min(pos * 1.8, 1) * 5;
      cloud.current.scale.x = scale;
      cloud.current.scale.y = scale;
      cloud.current.scale.z = scale;
    } else {
      cloud.current.position.y = 1000000;
    }
  }, [scrollPos]);

  return (
    <>
      {!isIntro && <CustomLight scrollPos={scrollPos} />}
      <group>
        {scrollPos < 0.056 && (
          <Sky
            inclination={1 - scrollPos * 10} // Sun elevation (default=0)
            sunPosition={[scrollPos * 1000, 100 - scrollPos * 2000, -300]}
          />
        )}
      </group>
      <group position={[0, 100, -10000]} ref={cloud}></group>

      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />
    </>
  );
}

const LIGHT_END = 0.4;

const LIGHT = new THREE.Color().setHSL(0.5, 1, 0.5);

function CustomLight({ scrollPos }: any) {
  const { width, height } = useThree((state) => state.viewport);
  const mousePos = useMousePos();

  const relativeScrollPos = useMemo(() => {
    return Math.max(scrollPos, 0.4);
  }, [scrollPos]);

  return (
    <group position={[-mousePos.x + 0.5, mousePos.y - 0.5, 0]}>
      <directionalLight intensity={5} color={new THREE.Color().setHSL(206 / 360, 1, 0.8)} position={[0, height * 0.3, width * 0.185]} />
      <directionalLight intensity={4 * relativeScrollPos} color={new THREE.Color().setHSL(240 / 360, 1, 0.6)} position={[-width * 0.13, -height * 0.12, width * 0.18]} />
      <directionalLight intensity={1 * relativeScrollPos} color={new THREE.Color().setHSL(235 / 360, 1, 0.1)} position={[width * 0.25, -height * 0.3, width * 0.3]} />

      <directionalLight intensity={3 * relativeScrollPos} color={new THREE.Color().setHSL(240 / 360, 1, 0.3)} position={[-width * 0.13, height * 0.04, width * 0.1]} />
      <directionalLight intensity={2 * relativeScrollPos} color={new THREE.Color().setHSL(235 / 360, 1, 0.7)} position={[width * 0.17, -height * 0.0, width * 0.25]} />
    </group>
  );
}
