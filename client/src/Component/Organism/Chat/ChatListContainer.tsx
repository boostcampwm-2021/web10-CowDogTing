import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { ChatImageContainer } from "./ChatImageContainer";
import { ChatListDetail } from "./ChatListDetail";

type ChatListContainerType = {
  profileRef: RefObject<HTMLDivElement[]>;
  onClick: (prev: any) => void;
};

export const ChatListContainer = ({ profileRef, onClick }: ChatListContainerType) => {
  return (
    <div css={ChatListContainerStyle} aria-hidden="true" onClick={onClick}>
      <ChatImageContainer profileRef={profileRef} />
      <ChatListDetail />
    </div>
  );
};

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 520px;
`;
