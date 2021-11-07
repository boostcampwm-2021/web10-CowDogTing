import React from "react";
import Chat from "../Atom/Chat";
import { MessageType } from "../util/type";

export default function Chats({ chats }: { chats: MessageType[] | null }) {
  const myID = "yj";

  return (
    <>
      {chats?.map((chat) => {
        const type = chat.from === myID ? "Mine" : "Other";
        return <Chat type={type}>{[chat.from, chat.message]}</Chat>;
      })}
    </>
  );
}
