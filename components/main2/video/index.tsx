import * as S from "./styles";
import { useEffect, useRef } from "react";

import useRefs from "react-use-refs";

const VID_ARR = ["Mountain.mp4", "Skeleton.mp4", "Treewater.mp4"];

export default function VideoComp({ videoIdx }: any) {
  const [vidRef0, vidRef1, vidRef2] = useRefs<HTMLVideoElement>(null);

  //on video indx change play
  useEffect(() => {
    const targetRef = videoIdx === 0 ? vidRef0 : videoIdx === 1 ? vidRef1 : vidRef2;
    if (videoIdx !== -1 && targetRef && targetRef.current !== null) {
      targetRef.current?.play();
    }
  }, [videoIdx]);

  console.log(videoIdx);

  return (
    <S.VideoContainer>
      {new Array(3).fill(0).map((_, i) => (
        <video
          autoPlay
          ref={i === 0 ? vidRef0 : i === 1 ? vidRef1 : vidRef2}
          key={i}
          style={{
            opacity: videoIdx === i ? 1 : 0,
          }}
        >
          <source src={`/video/${VID_ARR[i]}`} type="video/mp4" />
        </video>
      ))}
    </S.VideoContainer>
  );
}
