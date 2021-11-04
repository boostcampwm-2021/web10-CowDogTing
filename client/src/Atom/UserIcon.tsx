/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import userIcon from "../assets/userIcon.svg";

const userIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
interface UserIconProps {
  onClick: () => void;
}
function UserIcon(props: UserIconProps) {
  return <img alt="user Icon" src={userIcon} onClick={props.onClick} css={userIconStyle} />;
}

export default UserIcon;
