import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const VideoContainer = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  position: fixed;
  top: 0;
  left: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: auto;

    transition: opacity 0.5s;
  }
`;
