import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  pointer-events: default;
  z-index: 30;
  background: black;

  color: white;
  font-weight: 300;
  font-size: 1.2vw;
  mix-blend-mode: difference;

  transition: all 0.5s;

  font-family: Raleway;
`;

export const Section = styled.div`
  width: 40vw;
  padding: 5vw;
  height: 100%;
  ${FlexCenterStyle}
  flex-direction: column;

  h1 {
    font-family: "BebasNeue";
    font-size: 5vw;
    z-index: 40;

    span {
      pointer-events: default;
    }
  }
`;

export const MouseEl = styled.div`
  position: absolute;
  pointer-events: none;
  width: 10vw;
  height: 10vw;
  z-index: 50;

  border-radius: 50%;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  backdrop-filter: invert(100%);
`;

export const Cancel = styled.div`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 5vw;
  height: 5vw;
  ${FlexCenterStyle}
  font-size: 2vw;
  z-index: 50;
  color: white;
  cursor: pointer;
`;
