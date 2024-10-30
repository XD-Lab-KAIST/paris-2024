import styled, { css } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Wrapper = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  background: black;
`;

export const IFrame = styled.iframe`
  width: 100%;
  position: absolute;
  left: 0;
`;

export const DebugControls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  color: white;
  z-index: 1000;

  div {
    margin: 10px 0;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="range"] {
    width: 200px;
  }
`;
