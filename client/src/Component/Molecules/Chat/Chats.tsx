import React from "react";
import { Chat } from "@Atom/.";
import { MessageType } from "@Common/type";
import { userState } from "@Recoil/UserData";
import { useRecoilValue } from "recoil";

export const Chats = ({ chats }: { chats: MessageType[] }) => {
  const { id: myId } = useRecoilValue(userState);
  return (
    <>
      {chats?.map((chat, i) => {
        const { from, message, source } = chat;
        const type = from === myId ? "Mine" : "Other";
        return <Chat key={i} from={from} type={type} message={message} src={source} />;
      })}
    </>
  );
};
