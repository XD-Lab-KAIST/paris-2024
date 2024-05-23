import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Intro = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  z-index: 10;
  color: white;

  background: black;
  text-align: center;
  transition: all 2.5s;

  h1 {
    font-family: BebasNeue, sans-serif;
    font-size: 20vw;
    line-height: 1;

    span {
      transition: all 0.6s;
    }
  }
`;

export const MouseEl = styled.div`
  position: absolute;
  pointer-events: none;
  width: 10vw;
  height: 10vw;
  // border: 1px solid white;
  // box-shadow: 0 0 1vw white;
  border-radius: 50%;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  backdrop-filter: invert(100%);
`;
