/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import ChatRoomLeft from "../Template/ChatRoomLeft";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

export default function ChatRoom() {
  const searchParams = new URLSearchParams(useLocation().search);
  const chatRoomID = Number(searchParams.get("chatRoomID"));

  return (
    <div css={ChatRoomStyle}>
      <ChatRoomLeft chatRoomID={chatRoomID} />
    </div>
  );
}
