/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import { css } from "@emotion/react";
import { ChatProfileContainerType } from "../util/type";
import ProfileCard from "../Atom/ProfileCard";
import ProfileImageContainer from "../Molecules/ProfileImageContainer";
import ProfileImage from "../Atom/ProfileImage";
import dummyImage from "../assets/meetingImage.png";
import ChatProfileInfoContainer from "../Molecules/ChatProfileInfoContainer";

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
        const memberType = data.member.length > 2 ? "team" : data.member[0].sex;
        const lastChatInfo = data.chatMessage[data.chatMessage.length - 1];
        if (!data.chatMessage.length) return false;
        return (
          <div data-id={idx} ref={(el) => ((chatRoomRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
            <ProfileCard type={memberType}>
              <ProfileImageContainer>
                <ProfileImage type="Small" image={dummyImage} />
              </ProfileImageContainer>
              <ChatProfileInfoContainer lastChat={lastChatInfo.message} from={lastChatInfo.from} />
            </ProfileCard>
          </div>
        );
      })}
    </div>
  );
}

export default ChatProfileContainer;
