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

const buttonStyle = css`
  background: none;
`;

interface UserIconProps {
  onClick: () => void;
}
function UserIcon(props: UserIconProps) {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick} css={buttonStyle}>
      <img alt="user Icon" src={userIcon} css={userIconStyle} />
    </button>
  );
}

export default UserIcon;
