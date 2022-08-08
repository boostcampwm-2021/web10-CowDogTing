import React from "react";
import { css } from "@emotion/react";

const userIcon = "/Asset/userIcon.svg";

type UserIconProps = { onClick: () => void };

export const UserIcon: React.FC<UserIconProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} css={buttonStyle}>
      <img alt="user Icon" src={userIcon} css={userIconStyle} />
    </button>
  );
};

const userIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const buttonStyle = css`
  background: none;
`;
