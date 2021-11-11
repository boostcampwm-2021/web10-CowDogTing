/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ChatRoomLeft from "../Template/ChatRoomLeft";
import ChatRoomRight from "../Template/ChatRoomRight";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

export default function ChatRoom() {
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <div css={ChatRoomStyle}>
        <ChatRoomLeft />
      </div>
      <ChatRoomRight />
    </div>
  );
}
