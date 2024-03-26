import { EffectComposer, Bloom, Glitch, Noise } from "@react-three/postprocessing";

const THRESHOLD = 1;

export default function PostProcessing({ scrollPos }: any) {
  return (
    <>
      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0} height={400} />
        {scrollPos >= 0.95 && scrollPos <= 0.999 && <Glitch duration={[0.1, 1]} threshold={THRESHOLD} active={true} />}
      </EffectComposer>
    </>
  );
}
