import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;

  overflow-y: scroll !important;
  cursor: none;

  canvas {
    width: 100%;
    height: 100%;
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  height: 500vh;

  position: absolute;
  top: 0;
  left: 0;

  background: transparent;
`;

export const OverlaidContainer = styled.div`
  ${WholeContainer}
  position: fixed;
  z-index: 0;
`;

export const ThreeContainer = styled.div`
  ${WholeContainer}
  position: fixed;
  top: 0;
  left: 0;
`;
