import React from "react";
import ChatInput from "../Molecules/ChatInput";
import ChatDetail from "../Organism/ChatDetail";

export default function ChatRoomLeft(props: { chatRoomID: number }) {
  const { chatRoomID } = props;
  return (
    <>
      <ChatDetail chatRoomID={chatRoomID} />
      <ChatInput />
    </>
  );
}
