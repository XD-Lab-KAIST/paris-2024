import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const UIContainer = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  pointer-events: none;
  z-index: 15;

  color: white;
  font-weight: 300;
  font-size: 2vw;
  mix-blend-mode: difference;
  text-transform: lowercase;
`;

export const UIText = styled.div`
  position: absolute;
  bottom: 5vh;
  text-align: center;
`;

export const InfoIcon = styled.div`
  position: absolute;
  bottom: 2vw;
  left: 2vw;
  color: white;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
  pointer-events: default !important;
  z-index: 50;
  ${FlexCenterStyle}

  span {
    font-size: 3vw;
    font-weight: normal;
    cursor: pointer;
    pointer-events: default !important;
  }
`;
