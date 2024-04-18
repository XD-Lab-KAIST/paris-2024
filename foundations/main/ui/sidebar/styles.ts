import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Sidebar = styled.div`
  position: absolute;
  right: 2.5vw;
  height: 50vh;
  width: 0.5vw;
  mix-blend-mode: normal;
  //   background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25vw;
  box-shadow: 0 0 0.5vw rgba(255, 255, 255, 0.5), 0 0 1vw rgba(255, 255, 255, 0.3);
`;

export const Element = styled.div`
  ${FlexCenterStyle}
  mix-blend-mode: normal;
  position: absolute;
  top: 0;
  width: 0.5vw;
  // left: -0.5vw;
  height: 1.5vw;
  box-shadow: 0 0 0.5vw rgba(255, 255, 255, 1), 0 0 1vw rgba(255, 255, 255, 1);
  border-radius: 0.25vw;
  background: rgba(255, 255, 255, 1);
`;
