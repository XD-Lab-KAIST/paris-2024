import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { useSpring, a, easings } from "@react-spring/three";

import { TextureLoader } from "three";

const INITIAL_SCALE = 0.01;

export default function ThreeScene({ scrollPos, setVideoIdx }: any) {
  const meshRef: any = useRef();

  //viewport
  const { viewport, camera } = useThree();

  /**
   * Angle
   */
  useFrame(() => {
    //get current camera angle
    const angle = camera.rotation;
    if (angle.y > 0.5) {
      setVideoIdx(1);
    } else if (angle.y < -0.5) {
      console.log("31");
      setVideoIdx(2);
    } else {
      setVideoIdx(0);
    }
  });

  /**
   * SCALE ADJUST
   */
  const scaler = useMemo(() => INITIAL_SCALE + scrollPos ** 2, [scrollPos]);
  const { position, rotation, scale } = useSpring({
    from: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [INITIAL_SCALE, INITIAL_SCALE, INITIAL_SCALE] },
    to: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [scaler, scaler, scaler],
    },

    config: {
      tension: 170, // Controls the speed of the animation. Higher values make it faster.
      friction: 12, // Controls the bounciness. Lower values make it bouncier.
      mass: 1, // Mass of the object being animated. Affects the inertia of the animation.
      // You can adjust these values to achieve the desired bouncy effect.
      clamp: false, // When true, the spring will not overshoot. For bounciness, it's typically false.
      precision: 0.01, // The precision of the animation. Smaller values run the animation longer.
    },
  });

  return (
    <>
      <a.mesh position={position.to((x, y, z) => [x, y, z])} rotation={rotation.to((x, y, z) => [x, y, z])} scale={scale.to((x, y, z) => [x, y, z])}>
        {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </a.mesh>
      <OrbitControls />
    </>
  );
}
