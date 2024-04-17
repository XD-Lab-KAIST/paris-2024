import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}

  background: black;

  canvas {
    width: 100%;
    height: 100%;
  }
`;
