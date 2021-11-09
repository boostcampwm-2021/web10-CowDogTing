/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChatListContainerType } from "../util/type";
import ChatImageContainer from "./ChatImageContainer";
import ChatDetail from "./ChatDetail";
import ChatInput from "../Molecules/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import LinkButton from "../Molecules/LinkButton";

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ChatListContainer({ chatInfo }: ChatListContainerType) {
  const chatRoomId = chatInfo?.chatRoomID;
  return (
    <div css={ChatListContainerStyle}>
      <ChatImageContainer member={chatInfo?.member} />
      {chatRoomId !== undefined && (
        <>
          <ChatDetail chatRoomID={chatRoomId} />
          <ChatInputContainer>
            <ChatInput />
            <LinkButton url={`/ChatRoom?chatRoomId=${chatRoomId}`} type="Medium" content="추가기능" />
          </ChatInputContainer>
        </>
      )}
    </div>
  );
}

export default ChatListContainer;
