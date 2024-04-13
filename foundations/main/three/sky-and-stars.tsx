import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";
import useMousePos from "@/utils/hooks/useMousePos";

import * as THREE from "three";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud, Sky } from "@react-three/drei";

const START = 0.28;
const END = 0.577;

export default function SkyAndStars({ scrollPos }: any) {
  const [group, cloud] = useRefs<any>();
  const { size } = useThree();

  useEffect(() => {
    if (scrollPos >= START && scrollPos <= END) {
      const pos = (scrollPos - START) * (1 / (END - START));
      cloud.current.position.x = -size.width * 0;
      // cloud.current.position.y = size.height * 0.005 * Math.pow(1 - pos, 3);
      cloud.current.position.y = 0;
      cloud.current.position.z = -1000 * Math.pow(1 - pos, 5) + 85;
      cloud.current.rotation.y = Math.PI * 0.5 * pos;
      cloud.current.rotation.z = Math.PI * 5 * pos;
      // cloud.current.rotation.y = Math.PI * 0.5 * (1 - Math.pow(1 - pos, 2));
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
      <CustomLight scrollPos={scrollPos} />
      <group>
        {scrollPos < 0.056 && (
          <Sky
            inclination={1 - scrollPos * 10} // Sun elevation (default=0)
            sunPosition={[scrollPos * 1000, 100 - scrollPos * 2000, -300]}
          />
        )}
      </group>
      <group position={[0, 100, -10000]} ref={cloud}>
        {/* <Cloud seed={99} scale={0.3} volume={400} /> */}
        {/* <group position={[-1, -1, -1]}>
          <Cloud seed={5} scale={2.3} volume={3} />
        </group>
        <group position={[-1, 1, 1]}>
          <Cloud seed={7} scale={2.1} volume={2} />
        </group> */}
      </group>

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
      {/* {scrollPos >= 0.056 && <Sparkles count={100} colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]} size={1} fade animated fadeOut />} */}
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
