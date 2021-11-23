/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import { css } from "@emotion/react";
import { ChatProfileContainerType } from "../../util/type";
import ChatProfile from "./ChatProfile";

const ChatProfileContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid;
  padding-top: 3vh;
  min-width: 400px;
`;

function ChatProfileContainer({ chatsInfo, setClickedRoomIndex }: ChatProfileContainerType) {
  const chatRoomRef = useRef<HTMLDivElement[]>([]);
  console.log("in the chatProfile", chatsInfo);
  const profileClickEvent = (e: React.MouseEvent) => {
    if (!chatRoomRef.current) {
      return;
    }
    const target: HTMLElement = e.target as HTMLElement;
    const clickCard = chatRoomRef.current
      .map((ref) => {
        if (ref.contains(target)) return ref;
        return null;
      })
      .filter((ref) => ref !== null)[0];

    if (!clickCard) {
      return;
    }

    const { id } = clickCard.dataset;

    setClickedRoomIndex(id);
  };

  return (
    <div css={ChatProfileContainerStyle} onClick={profileClickEvent}>
      {chatsInfo?.map((data, idx) => {
        if (!data.chatMessage.length) return false;
        return <ChatProfile data={data} idx={idx} chatRoomRef={chatRoomRef} />;
      })}
    </div>
  );
}

export default ChatProfileContainer;
