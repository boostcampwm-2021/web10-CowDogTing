import React from "react";
import { useRecoilValue } from "recoil";
import ChatInput from "../../Molecules/Chat/ChatInput";
import { LinkButton } from "@Core/LinkButton";
import ChatDetail from "./ChatDetail";
import ChatInputContainer from "./ChatInputContainer";
import { chatTarget } from "../../../Recoil/Atom";

export default function ChatListDetail() {
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
}
