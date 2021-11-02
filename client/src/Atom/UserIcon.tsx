/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import userIcon from "../assets/userIcon.svg";

const userIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  top: 4%;
  left: 90%;
`;

function UserIcon() {
  return <img alt="user Icon" src={userIcon} css={userIconStyle} />;
}

export default UserIcon;
