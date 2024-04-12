import { EffectComposer, Bloom, Glitch, Noise } from "@react-three/postprocessing";
import { CameraShake } from "@react-three/drei";
import { useMemo } from "react";

const THRESHOLD = 1;

export default function PostProcessing({ scrollPos }: any) {
  return (
    <>
      <EffectComposer>{scrollPos >= 0.98 && scrollPos <= 0.999 ? <Glitch duration={[0.1, 1]} threshold={THRESHOLD} /> : <></>}</EffectComposer>
    </>
  );
}
