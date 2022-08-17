import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { chatsState } from "@Recoil/ChatData";
import { ChatRoomLeft } from "@Template/ChatRoomLeft/ChatRoomLeft";
import { ChatRoomRight } from "@Template/ChatRoomRight/ChatRoomRight";
import { chatTarget } from "@Recoil/Atom";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

const ChatRoom: React.FC = () => {
  const setChatInfo = useSetRecoilState(chatTarget);
  const chatDatas = useRecoilValue(chatsState);
  const searchParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const chatRoomId = searchParams.get("chatRoomId");
    setChatInfo([...chatDatas.filter((data) => data.chatRoomId === Number(chatRoomId))][0]);
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <div css={ChatRoomStyle}>
        <ChatRoomLeft />
      </div>
      <ChatRoomRight />
    </div>
  );
};

export default ChatRoom;
