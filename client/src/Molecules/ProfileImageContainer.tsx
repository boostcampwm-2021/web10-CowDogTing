/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const ProfileImageContainerStyle = css`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProfileImageContainer({ children }: ChildrenType) {
  return <div css={ProfileImageContainerStyle}>{children}</div>;
}

export default ProfileImageContainer;
