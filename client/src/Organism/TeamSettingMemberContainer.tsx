/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const TeamSettingMemberContainerStyle = css`
  display: flex;
  width: 90%;
  height: fit-content;
  margin: 2vh auto;
  align-items: center;
  justify-content: space-around;
`;
function TeamSettingMemberContainer({ children }: ChildrenType) {
  return <div css={TeamSettingMemberContainerStyle}>{children}</div>;
}

export default TeamSettingMemberContainer;
