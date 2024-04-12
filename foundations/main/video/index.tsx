import * as S from "./styles";
import { useEffect, useRef } from "react";

import useRefs from "react-use-refs";

const VID_ARR = ["Skeleton.mp4", "Mountain.mp4", "Treewater.mp4"];

export default function VideoComp({ videoIdx, cycleIdx, setVideoIdx }: any) {
  const [vidRef0, vidRef1, vidRef2] = useRefs<HTMLVideoElement>(null);

  //on video indx change play
  useEffect(() => {
    const targetRef = videoIdx === 0 ? vidRef0 : videoIdx === 1 ? vidRef1 : vidRef2;
    if (videoIdx !== -1 && targetRef && targetRef.current !== null) {
      targetRef.current?.play();
    }

    //other refs stop
    try {
      if (videoIdx === -1) {
        if (!vidRef0.current || !vidRef1.current || !vidRef2.current) return;
        //stop all videos
        vidRef0.current?.pause();
        vidRef1.current?.pause();
        vidRef2.current?.pause();

        //reset all videos
        vidRef0.current.currentTime = 0;
        vidRef1.current.currentTime = 0;
        vidRef2.current.currentTime = 0;
      }
    } catch (e) {
      console.log(e);
    }
  }, [videoIdx]);

  //playback rate
  useEffect(() => {
    const playbackRate = Math.min(1 + cycleIdx * 0.4, 4);
    try {
      if (vidRef0.current && vidRef1.current && vidRef2.current) {
        vidRef0.current.playbackRate = playbackRate;
        vidRef1.current.playbackRate = playbackRate;
        vidRef2.current.playbackRate = playbackRate;
      }
    } catch (e) {
      console.log(e);
    }
  }, [cycleIdx]);

  return (
    <S.VideoContainer>
      {new Array(3).fill(0).map((_, i) => (
        <SingleVideoEl key={i} i={i} videoIdx={videoIdx} setVideoIdx={setVideoIdx} vidRef0={vidRef0} vidRef1={vidRef1} vidRef2={vidRef2} cycleIdx={cycleIdx} />
      ))}
    </S.VideoContainer>
  );
}

function SingleVideoEl({ i, videoIdx, setVideoIdx, vidRef0, vidRef1, vidRef2, cycleIdx }: any) {
  return (
    <S.SingleVideo>
      <video
        autoPlay
        // loop
        onEnded={() => {
          setVideoIdx((prev: number) => (prev === -1 ? -1 : (prev + 1) % 3));
        }}
        ref={i === 0 ? vidRef0 : i === 1 ? vidRef1 : vidRef2}
        style={{
          opacity: videoIdx >= i ? 1 : 0,
          transform: videoIdx === i || cycleIdx >= 5 ? "scale(1)" : "scale(0.9)",
          transition: cycleIdx >= 5 ? "" : `opacity ${0.5 / (cycleIdx + 1)}s, transform ${1 / (cycleIdx + 1)}s`,
        }}
      >
        <source src={`/video/${VID_ARR[i]}`} type="video/mp4" />
      </video>
    </S.SingleVideo>
  );
}
