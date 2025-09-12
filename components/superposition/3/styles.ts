import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
  
    cursor: none !important;
    touch-action: none; /* prevent browser gestures/pinch */
  `
  

export const VideoWrapper = styled.div<{ isStarted: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: ${({ isStarted }) => (isStarted ? 1 : 0)};
  transition: opacity 2s ease-in;
`;

export const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  
`;


export const IntroContainer = styled.div<{ isExiting: boolean }>`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
  z-index: 10;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 8s ease-out;
  pointer-events: ${({ isExiting }) => (isExiting ? "none" : "auto")};
`;

export const EnterButton = styled.div<{ isExiting: boolean }>`
  ${FlexCenterStyle}
  position: relative;
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  // border: 0.1rem solid white;
  color: white;
  font-size: 3vw;
  font-family: Helvetica, sans-serif;
  cursor: pointer;
  transition: all 0.3s;

  &::after {
    content: "시작";
    ${FlexCenterStyle}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${({ isExiting }) => (!isExiting ? 0 : 1)};
    transition: opacity 0.3s;
  }

  &:hover {
    background: white;
    color: black;

    &::after {
      opacity: 1;
    }
  }
`;
