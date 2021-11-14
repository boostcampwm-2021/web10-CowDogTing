/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const TeamCreateInputContainerStyle = css`
  padding-top: 30px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  #location {
    height: 150px;
  }
`;

function TeamInputContainer({ children }: ChildrenType) {
  return <div css={TeamCreateInputContainerStyle}>{children}</div>;
}

export default TeamInputContainer;
