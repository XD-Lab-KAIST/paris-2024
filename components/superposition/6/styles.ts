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

export const Crosshair = styled.div<{ visible: boolean; scale: number; mode: "increasing" | "decreasing" | "none" }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 2rem;
  height: 2rem;
  z-index: 5;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  // transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(${({ scale }) => scale});
  mix-blend-mode: difference;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: white;
  }

  // Horizontal line
  &::before {
    left: 0;
    top: 50%;
    width: 100%;
    height: 0.1rem;
    margin-top: -0.05rem;
  }

  // Vertical line
  &::after {
    display: ${({ mode }) => (mode === "increasing" ? "block" : "none")};
    top: 0;
    left: 50%;
    height: 100%;
    width: 0.1rem;
    margin-left: -0.05rem;
  }
`;
