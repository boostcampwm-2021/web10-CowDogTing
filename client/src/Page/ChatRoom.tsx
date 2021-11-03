/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import ChatDetail from "../Organism/ChatDetail";
import ChatInput from "../Molecules/ChatInput";

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
      <ChatDetail chatRoomID={chatRoomID} />
      <ChatInput />
    </div>
  );
}
