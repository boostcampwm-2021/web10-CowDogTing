import React from "react";
import { css } from "@emotion/react";
import { ChatListContainerType } from "@Common/type";
import { ChatImageContainer } from "./ChatImageContainer";
import { ChatListDetail } from "./ChatListDetail";

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 520px;
`;

export const ChatListContainer = ({ profileRef, onClick }: ChatListContainerType) => {
  return (
    <div css={ChatListContainerStyle} aria-hidden="true" onClick={onClick}>
      <ChatImageContainer profileRef={profileRef} />
      <ChatListDetail />
    </div>
  );
};
