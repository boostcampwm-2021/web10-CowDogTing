import React, { useRef } from "react";
import { css } from "@emotion/react";
import { ChatInfoType } from "@Common/type";
import { NotReadNum } from "@Molecules/.";
import { ChatProfile } from "./ChatProfile";

const ChatProfileContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid;
  padding-top: 3vh;
  min-width: 400px;
  overflow: auto;
`;

type ChatProfileContainerType = {
  chatsInfo: ChatInfoType[] | null;
  setClickedRoomIndex: Function;
};

export const ChatProfileContainer = ({ chatsInfo, setClickedRoomIndex }: ChatProfileContainerType) => {
  const chatRoomRef = useRef<HTMLDivElement[]>([]);

  const profileClickEvent = (e: React.MouseEvent) => {
    if (!chatRoomRef.current) return;
    const target = e.target as HTMLElement;
    const [clickCard] = chatRoomRef.current.filter((ref) => ref.contains(target));
    if (!clickCard) return;
    setClickedRoomIndex(clickCard.dataset.id);
  };

  return (
    <div css={ChatProfileContainerStyle} aria-hidden="true" onClick={profileClickEvent}>
      {chatsInfo?.map((data, idx) => {
        if (!data.chatMessage.length) return null;
        return (
          <React.Fragment key={idx}>
            <ChatProfile data={data} idx={idx} chatRoomRef={chatRoomRef} />
            <NotReadNum type={String(data.chatRoomId)} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
