import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  pointer-events: all;

  background: black;
  color: white;
  z-index: 1000 !important;
  transition: opacity 1s;
`;

export const LoadingBar = styled.div`
  width: 30vw;
  height: 2vw;
  border-radius: 0.5vw;
  background: black;
  position: relative;
  box-shadow: inset 0 0 0.5vw white;
  ${FlexCenterStyle}
`;

export const Text = styled.div`
  color: white;
  mix-blend-mode: difference;
`;

export const InnerBar = styled.div`
  width: 0%;
  height: 100%;
  background: white;
  border-radius: 0.5vw;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.2s;
`;
