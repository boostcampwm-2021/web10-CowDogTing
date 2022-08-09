import React from "react";
import { useRecoilValue } from "recoil";
import { ChatInput } from "@Molecules/Chat/ChatInput/ChatInput";
import { LinkButton } from "@Core/LinkButton";
import { chatTarget } from "@Recoil/Atom";
import { ChatDetail } from "./ChatDetail/ChatDetail";
import { ChatInputContainer } from "./ChatInputContainer";

export const ChatListDetail = () => {
  const { chatRoomId } = useRecoilValue(chatTarget);
  if (chatRoomId === 0) return null;
  return (
    <>
      <ChatDetail />
      <ChatInputContainer>
        <ChatInput />
        <LinkButton url={`/ChatRoom?chatRoomId=${chatRoomId}`} type="Small" content="추가기능" />
      </ChatInputContainer>
    </>
  );
};
