import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { useSpring, a, easings } from "@react-spring/three";

import { TextureLoader } from "three";

export default function ThreeScene({ scrollPos }: any) {
  const meshRef: any = useRef();

  //viewport
  const { viewport } = useThree();
  console.log(viewport);
  const scaler = useMemo(() => 0.1 + scrollPos ** 2, [scrollPos]);

  const { position, rotation, scale } = useSpring({
    from: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 0.1] },
    to: {
      position: [0, -(viewport.height / 2) * scrollPos, 0],
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
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </a.mesh>
    </>
  );
}
