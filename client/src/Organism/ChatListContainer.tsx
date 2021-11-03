/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChatListContainerType } from "../util/type";
import ChatImageContainer from "./ChatImageContainer";

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ChatListContainer({ chatInfo }: ChatListContainerType) {
  return (
    <div css={ChatListContainerStyle}>
      <ChatImageContainer member={chatInfo?.member} />
    </div>
  );
}

export default ChatListContainer;
