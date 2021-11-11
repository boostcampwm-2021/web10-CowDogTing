/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { MessageType } from "../util/type";
import Chats from "../Molecules/Chats";
import { chatsState } from "../Recoil/Atom";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;

export default function ChatDetail({ chatRoomID }: { chatRoomID: number | undefined }) {
  const [chats, setChats] = useState<MessageType[] | null>(null);
  const datas = useRecoilValue(chatsState);

  const getChats = async () => {
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
