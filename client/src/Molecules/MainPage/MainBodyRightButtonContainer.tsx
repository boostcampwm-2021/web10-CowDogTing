/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const mainBodyRightButtonContainerStyle = css`
  display: none;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MainBodyRightButtonContainer({ children }: ChildrenType) {
  return <div css={mainBodyRightButtonContainerStyle}>{children}</div>;
}

export default MainBodyRightButtonContainer;
