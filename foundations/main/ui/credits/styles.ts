import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  pointer-events: default;
  z-index: 40;
  backdrop-filter: blur(1vw);
  -webkit-backdrop-filter: blur(1vw);

  color: white;
  font-weight: 300;
  font-size: 1.2vw;
  background: rgba(255, 255, 255, 0.2);
  // mix-blend-mode: difference;

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

    span {
      pointer-events: default;
      transition: all 1s;
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
