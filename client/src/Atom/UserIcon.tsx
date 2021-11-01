/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import userIcon from "../assets/userIcon.svg";

const userIconStyle = css`
  position: relative;
  width: 32px;
  height: 32px;
  left: 90%;
`;

function UserIcon() {
  return <img alt="user Icon" src={userIcon} css={userIconStyle} />;
}

export default UserIcon;
