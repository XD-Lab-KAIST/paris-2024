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
  font-family: Raleway;
  position: absolute;
  bottom: 2.5vw;
  color: white;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
  pointer-events: default !important;
  z-index: 50;
  ${FlexCenterStyle}
  flex-direction: column;

  p {
    margin-top: 0.5vw;
    font-weight: 300;
  }

  @keyframes appear {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  animation: appear 1s;

  img {
    width: 2.5vw;
    height: 2.5vw;
    cursor: pointer;
    pointer-events: default !important;
  }

  span {
    font-size: 3vw;
    font-weight: normal;
    cursor: pointer;
    pointer-events: default !important;
  }
`;
