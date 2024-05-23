import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;

  overflow-y: scroll !important;
  // cursor: none;
  font-family: Raleway;

  canvas {
    width: 100%;
    height: 100%;
  }

  &::-webkit-scrollbar {
    display: none !important;
    -webkit-appearance: none;
    width: 0 !important;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background-color: transparent;
    outline: none;
  }

  /* width */
  -ms-overflow-style: none;
  scrollbar-width: none !important;
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

  &::-webkit-scrollbar {
    display: none !important;
    -webkit-appearance: none;
    width: 0 !important;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background-color: transparent;
    outline: none;
  }

  /* width */
  -ms-overflow-style: none;
  scrollbar-width: none !important;
`;
