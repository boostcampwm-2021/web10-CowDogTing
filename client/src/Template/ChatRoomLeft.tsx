/* eslint-disable react/destructuring-assignment */
import React from "react";
import ChatInput from "../Molecules/ChatInput";
import ChatDetail from "../Organism/ChatDetail";

export default function ChatRoomLeft(props: { chatRoomID: number }) {
  return (
    <>
      <ChatDetail chatRoomID={props.chatRoomID} />
      <ChatInput />
    </>
  );
}
