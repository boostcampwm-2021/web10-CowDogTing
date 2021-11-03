/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import ChatRoomLeft from "../Template/ChatRoomLeft";
import ChatRoomRight from "../Template/ChatRoomRight";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

export default function ChatRoom() {
  const searchParams = new URLSearchParams(useLocation().search);
  const chatRoomID = Number(searchParams.get("chatRoomID"));

  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <div css={ChatRoomStyle}>
        <ChatRoomLeft chatRoomID={chatRoomID} />
      </div>
      <ChatRoomRight chatRoomID={chatRoomID} />
    </div>
  );
}
