import React from "react";
import { css } from "@emotion/react";

export type ChatIconProps = { onClick: () => void };
export const ChatIcon = ({ onClick }: ChatIconProps) => {
  return (
    <button type="button" onClick={onClick} css={buttonStyle}>
      <img alt="user Icon" src={ChatIconImg} css={ChatIconStyle} />
    </button>
  );
};

const ChatIconImg = "/Asset/ChatIcon.png";
const ChatIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const buttonStyle = css`
  background: none;
`;
