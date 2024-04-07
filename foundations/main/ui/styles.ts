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
