/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import TeamInputContainer from "./TeamInputContainer";
import { ChildrenType } from "../util/type";

const TeamInfoContainerStyle = css`
  display: flex;
  width: 100%;
  height: 70%;
  border: 1px solid #b0c2ff;
`;
const ImageContainerStyle = css`
  width: 100%;
  height: 100%;
`;

function TeamInfoContainer({ children }: ChildrenType) {
  return (
    <div css={TeamInfoContainerStyle}>
      <div css={ImageContainerStyle}>image 입주 예정</div>
      <TeamInputContainer>{children}</TeamInputContainer>
    </div>
  );
}

export default TeamInfoContainer;
