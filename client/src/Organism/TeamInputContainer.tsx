/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { ChildrenType } from "../util/type";

const TeamCreateInputContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

function TeamInputContainer({ children }: ChildrenType) {
  return <div css={TeamCreateInputContainerStyle}>{children}</div>;
}

export default TeamInputContainer;
