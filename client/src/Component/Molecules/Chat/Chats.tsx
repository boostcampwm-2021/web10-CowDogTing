import React from "react";
import { useRecoilValue } from "recoil";
import Chat from "../../Atom/Chat";
import { chatTarget } from "../../../Recoil/Atom";

export default function Chats() {
  const { chatMessage: chats } = useRecoilValue(chatTarget);
  return (
    <>
      {chats?.map((chat) => {
        const { from, message, source } = chat;
        return <Chat from={from} message={message} src={source} />;
      })}
    </>
  );
}
