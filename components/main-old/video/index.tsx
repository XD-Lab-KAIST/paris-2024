import * as S from "./styles";
import { useEffect, useRef } from "react";

const VID_ARR = ["Mountain.mp4", "Skeleton.mp4", "Treewater.mp4"];

export default function VideoComp({ videoIdx }: any) {
  const vidRef = useRef<HTMLVideoElement>(null);

  //on video indx change play
  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.play();
    }
  }, [videoIdx]);

  return (
    <S.VideoContainer>
      {videoIdx >= 0 && (
        <video autoPlay ref={vidRef}>
          <source src={`/video/${VID_ARR[videoIdx]}`} type="video/mp4" />
        </video>
      )}
    </S.VideoContainer>
  );
}
