import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Wrapper = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
`;

export const IFrame = styled.iframe`
  width: 100%;
  height: 50%;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;

    //no iframe styling
  }
`;
