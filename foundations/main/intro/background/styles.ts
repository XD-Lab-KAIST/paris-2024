import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Background = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
`;
