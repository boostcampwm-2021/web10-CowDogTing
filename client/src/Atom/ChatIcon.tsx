/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
interface ChatIconProps {
  onClick: () => void;
}
function ChatIcon(props: ChatIconProps) {
  return <img alt="user Icon" src={ChatIconImg} onClick={props.onClick} css={ChatIconStyle} />;
}

export default ChatIcon;
