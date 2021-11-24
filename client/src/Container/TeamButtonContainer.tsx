/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const TeamButtonContainerStyle = css`
  display: flex;
  width: 60vw;
  height: 20%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 3vh;
`;
function TeamButtonContainer({ children }: ChildrenType) {
  return <div css={TeamButtonContainerStyle}>{children}</div>;
}

export default TeamButtonContainer;
