import React from "react";
import { Chat } from "@Atom/.";
import { MessageType } from "@Util/type";

export const Chats = ({ chats }: { chats: MessageType[] }) => {
  return (
    <>
      {chats?.map((chat, i) => {
        const { from, message, source } = chat;
        return <Chat key={i} from={from} message={message} src={source} />;
      })}
    </>
  );
};
