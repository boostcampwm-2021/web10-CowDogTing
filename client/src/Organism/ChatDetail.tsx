/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { getChatInfo } from "../util/dummyData";
import { MessageType } from "../util/type";
import Chats from "../Molecules/Chats";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;

export default function ChatDetail({ chatRoomID }: { chatRoomID: number }) {
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
      <Chats chats={chats} />
    </div>
  );
}
