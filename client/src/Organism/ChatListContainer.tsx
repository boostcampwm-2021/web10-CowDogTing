/** @jsxImportSource @emotion/react */
import React from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { ChatListContainerType } from "../util/type";
import ChatImageContainer from "./ChatImageContainer";
import ChatDetail from "./ChatDetail";
import ChatInput from "../Molecules/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import LinkButton from "../Molecules/LinkButton";
import { chatTarget } from "../Recoil/Atom";
import { handleModalClick } from "../util";

const ChatListContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ChatListContainer({ profileRef, setOpenModal }: ChatListContainerType) {
  const { chatRoomId } = useRecoilValue(chatTarget);

  return (
    <div css={ChatListContainerStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      <ChatImageContainer profileRef={profileRef} />
      {chatRoomId && (
        <>
          <ChatDetail />
          <ChatInputContainer>
            <ChatInput />
            <LinkButton url="/ChatRoom" type="Medium" content="추가기능" />
          </ChatInputContainer>
        </>
      )}
    </div>
  );
}

export default ChatListContainer;
