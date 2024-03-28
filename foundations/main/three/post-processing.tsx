import { EffectComposer, Bloom, Glitch, Noise } from "@react-three/postprocessing";
import { CameraShake } from "@react-three/drei";
import { useMemo } from "react";

const THRESHOLD = 1;

export default function PostProcessing({ scrollPos }: any) {
  const bloomIntensity = useMemo(() => {
    if (scrollPos < 0.25) return 2;
    else if (scrollPos > 0.4) return -3;
    else {
      return 2 - (scrollPos - 0.25) * (5 / 0.15);
    }
  }, [scrollPos]);

  return (
    <>
      <EffectComposer>
        <Bloom intensity={bloomIntensity} luminanceThreshold={0} luminanceSmoothing={0} height={400} />
        {scrollPos >= 0.985 && scrollPos <= 0.999 && <Glitch duration={[0.1, 1]} threshold={THRESHOLD} active={true} />}
      </EffectComposer>
      {/* {scrollPos >= 0.95 && scrollPos <= 0.999 && <CameraShake intensity={100 * (scrollPos - 0.95)} yawFrequency={1} pitchFrequency={1} rollFrequency={1} triggerThreshold={0.5} active />} */}
    </>
  );
}
