import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import * as THREE from "three";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud, Sky } from "@react-three/drei";

const START = 0.28;
const END = 0.577;

export default function SkyAndStars({ scrollPos }: any) {
  const [group, cloud] = useRefs<any>();
  const { size } = useThree();

  console.log(scrollPos);

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
        <Cloud seed={99} scale={0.3} volume={400} />
        {/* <group position={[-1, -1, -1]}>
          <Cloud seed={5} scale={2.3} volume={3} />
        </group>
        <group position={[-1, 1, 1]}>
          <Cloud seed={7} scale={2.1} volume={2} />
        </group> */}
      </group>

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade animated />
      <Environment preset={"city"} background={false} />
      {/* {scrollPos >= 0.056 && <Sparkles count={100} colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]} size={1} fade animated fadeOut />} */}
    </>
  );
}

const LIGHT_END = 0.4;

function CustomLight({ scrollPos }: any) {
  const [hue, setHue] = useState(0.5);
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);
  useEffect(() => {
    if (scrollPos >= START && scrollPos <= LIGHT_END) {
      const pos = (scrollPos - START) * (1 / (LIGHT_END - START));
      setHue(0.5 + 0.5 * pos);
      setSaturation(1 - pos ** 2);
      setLightness(0.5 + 0.3 * pos);
    }
  }, [scrollPos]);

  return <directionalLight intensity={3} color={new THREE.Color().setHSL(hue, saturation, lightness)} position={[0, 5 * Math.sin(scrollPos * Math.PI), 5 * Math.cos(scrollPos * Math.PI)]} />;
}
