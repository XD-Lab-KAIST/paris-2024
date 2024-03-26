import * as S from "./styles";
import { useEffect, useRef } from "react";

import useRefs from "react-use-refs";

const VID_ARR = ["Mountain.mp4", "Skeleton.mp4", "Treewater.mp4"];

export default function VideoComp({ videoIdx, cycleIdx }: any) {
  const [vidRef0, vidRef1, vidRef2] = useRefs<HTMLVideoElement>(null);

  //on video indx change play
  useEffect(() => {
    const targetRef = videoIdx === 0 ? vidRef0 : videoIdx === 1 ? vidRef1 : vidRef2;
    if (videoIdx !== -1 && targetRef && targetRef.current !== null) {
      targetRef.current?.play();
    }
  }, [videoIdx]);

  return (
    <S.VideoContainer>
      {new Array(3).fill(0).map((_, i) => (
        <SingleVideoEl key={i} i={i} videoIdx={videoIdx} vidRef0={vidRef0} vidRef1={vidRef1} vidRef2={vidRef2} cycleIdx={cycleIdx} />
      ))}
    </S.VideoContainer>
  );
}

function SingleVideoEl({ i, videoIdx, vidRef0, vidRef1, vidRef2, cycleIdx }: any) {
  return (
    <S.SingleVideo>
      <video
        autoPlay
        ref={i === 0 ? vidRef0 : i === 1 ? vidRef1 : vidRef2}
        style={{
          opacity: videoIdx >= i ? 1 : 0,
          transform: videoIdx === i ? "scale(1)" : "scale(0.9)",
          transition: cycleIdx >= 5 ? "" : `opacity ${0.5 / (cycleIdx + 1)}s, transform ${1 / (cycleIdx + 1)}s`,
        }}
      >
        <source src={`/video/${VID_ARR[i]}`} type="video/mp4" />
      </video>
    </S.SingleVideo>
  );
}
