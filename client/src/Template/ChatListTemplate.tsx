/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ChatProfileContainer from "../Organism/ChatProfileContainer";
import ChatListContainer from "../Organism/ChatListContainer";
import { getChatsInfo } from "../util/dummyData";
import { ChatsInfoType } from "../util/type";

const ChatListTemplateStyle = css`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function ChatListTemplate() {
  const [chatsInfo, setChatsInfo] = useState<ChatsInfoType | null>(null);
  const getChatRoomData = async () => {
    const data = await getChatsInfo();
    setChatsInfo(data);
  };
  useEffect(() => {
    getChatRoomData();
  }, []);
  return (
    <div css={ChatListTemplateStyle}>
      <ChatProfileContainer chatsInfo={chatsInfo} />
      <ChatListContainer />
    </div>
  );
}

export default ChatListTemplate;
