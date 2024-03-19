import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const VideoContainer = styled.div`
  ${WholeContainer}
  position: fixed;
  top: 0;
  left: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
