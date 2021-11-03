/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Chat from "../Atom/Chat";
import { getChatInfo } from "../util/dummyData";
import { MessageType } from "../util/type";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;

export default function ChatDetail({ chatRoomID }: { chatRoomID: number }) {
  const myID = "yj";
  const [chats, setChats] = useState<MessageType[] | null>(null);

  const getChats = async () => {
    const { data: datas } = await getChatInfo();
    setChats(datas.filter((data) => data.chatRoomID === chatRoomID)[0].chatMessage);
  };
  useEffect(() => {
    getChats();
  }, [chatRoomID]);

  return (
    <div css={ChatContainerStyle}>
      {chats?.map((chat) => {
        const type = chat.from === myID ? "Mine" : "Other";
        return <Chat type={type}>{[chat.from, chat.message]}</Chat>;
      })}
    </div>
  );
}
