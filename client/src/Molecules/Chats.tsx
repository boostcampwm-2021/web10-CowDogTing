import React from "react";
import { useRecoilValue } from "recoil";
import Chat from "../Atom/Chat";
import { chatTarget, userState } from "../Recoil/Atom";

export default function Chats() {
  const { id: myId } = useRecoilValue(userState);
  const { chatMessage: chats } = useRecoilValue(chatTarget);

  return (
    <>
      {chats?.map((chat) => {
        const type = chat.from === myId ? "Mine" : "Other";
        return <Chat type={type}>{[chat.from, chat.message]}</Chat>;
      })}
    </>
  );
}
