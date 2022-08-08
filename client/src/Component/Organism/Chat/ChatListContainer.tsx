/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ChatImageContainer from "./ChatImageContainer";
import ChatListDetail from "./ChatListDetail";
import { ChatListContainerType } from "../../../util/type";
import { handleModalClick } from "../../../util";

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 520px;
`;

function ChatListContainer({ profileRef, setOpenModal }: ChatListContainerType) {
  return (
    <div css={ChatListContainerStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      <ChatImageContainer profileRef={profileRef} />
      <ChatListDetail />
    </div>
  );
}

export default ChatListContainer;
