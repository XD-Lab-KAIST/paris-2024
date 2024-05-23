import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Background = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
  z-index: 3;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
