/* eslint-disable react/destructuring-assignment */
import React from "react";
import Chat from "../Atom/Chat";
import { MessageType } from "../util/type";

export default function Chats(props: { chats: MessageType[] | null }) {
  const myID = "yj";

  return (
    <>
      {props.chats?.map((chat) => {
        const type = chat.from === myID ? "Mine" : "Other";
        return <Chat type={type}>{[chat.from, chat.message]}</Chat>;
      })}
    </>
  );
}
