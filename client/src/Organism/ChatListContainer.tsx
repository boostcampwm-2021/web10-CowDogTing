/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ChatListContainerType } from "../util/type";
import ChatImageContainer from "./ChatImageContainer";
import ChatDetail from "./ChatDetail";
import ChatInput from "../Molecules/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import { Button } from "../Atom/Button";

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
            <Link to={`/sub/ChatRoom?chatRoomId=${chatRoomId}`}>
              <Button>추가기능</Button>
            </Link>
          </ChatInputContainer>
        </>
      )}
    </div>
  );
}

export default ChatListContainer;
