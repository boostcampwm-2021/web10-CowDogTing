/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ChatIconImg from "../assets/ChatIcon.png";

const ChatIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const buttonStyle = css`
  background: none;
`;
interface ChatIconProps {
  onClick: () => void;
}
function ChatIcon(props: ChatIconProps) {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick} css={buttonStyle}>
      <img alt="user Icon" src={ChatIconImg} css={ChatIconStyle} />
    </button>
  );
}

export default ChatIcon;
