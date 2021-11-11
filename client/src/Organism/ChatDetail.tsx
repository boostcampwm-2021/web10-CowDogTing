/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Chats from "../Molecules/Chats";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;

export default function ChatDetail() {
  return (
    <div css={ChatContainerStyle}>
      <Chats />
    </div>
  );
}
