import React, { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import useRefs from "react-use-refs";

import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Fisheye, useScroll, Stars, useGLTF, CameraShake, Text3D, Center, FaceLandmarker, FaceControls, Sparkles, Environment, Cloud, Sky } from "@react-three/drei";

export default function SkyAndStars({ scrollPos }: any) {
  const [group, cloud] = useRefs<any>();
  const { size } = useThree();

  useEffect(() => {
    const START = 0.21;
    const END = 0.29;
    if (scrollPos >= START && scrollPos <= END) {
      const pos = (scrollPos - START) * (1 / (END - START));
      console.log(pos, scrollPos);
      cloud.current.position.x = size.width * 0.03 * (-0.5 + pos);
    }
  }, [scrollPos]);

  return (
    <>
      <group>
        {scrollPos < 0.056 && (
          <Sky
            inclination={1 - scrollPos * 10} // Sun elevation (default=0)
            sunPosition={[scrollPos * 1000, 100 - scrollPos * 2000, -300]}
          />
        )}
      </group>
      <group position={[-100, 0, 2]} ref={cloud}>
        <Cloud seed={3} scale={1.4} volume={5} />
      </group>

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade animated />
      {scrollPos >= 0.25 && <Environment preset={"city"} />}
      {/* {scrollPos >= 0.056 && <Sparkles count={100} colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]} size={1} fade animated fadeOut />} */}
    </>
  );
}
