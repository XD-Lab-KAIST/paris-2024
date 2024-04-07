import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Intro = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  z-index: 10;
  background: black;
  color: white;
  // cursor: pointer;
  text-align: center;

  h1 {
    font-family: BebasNeue;
    font-size: 20vw;
    line-height: 1;
  }
`;
