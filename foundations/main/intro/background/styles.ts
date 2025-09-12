import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Background = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
  z-index: 3;
  pointer-events: none !important;

  transition: opacity 4s;
`;

export const CanvasStyle = styled.div`
  ${WholeContainer}
  transition: opacity 3.5s;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
