import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}

  background: black;

  canvas {
    width: 100%;
    height: 100%;
  }
`;

export const MouseEl = styled.div`
  position: absolute;
  pointer-events: none;
  width: 10vw;
  height: 10vw;
  z-index: 50;

  border-radius: 50%;
  background: white;
  // mix-blend-mode: difference;

  transform: translate(-50%, -50%);
  // backdrop-filter: brightness(1.5);
`;
