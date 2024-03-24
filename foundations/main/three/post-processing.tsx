import { EffectComposer, Bloom, Glitch, Noise } from "@react-three/postprocessing";

const THRESHOLD = 50;

export default function PostProcessing() {
  return (
    <>
      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0} height={400} />
        <Glitch delay={[1, 2]} duration={[0.1, 0.2]} threshold={THRESHOLD} active={true} />
        <Noise opacity={0.5} />
      </EffectComposer>
    </>
  );
}
