/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChatProfileContainerType } from "../util/type";
import ProfileCard from "../Atom/ProfileCard";
import ProfileImageContainer from "../Molecules/ProfileImageContainer";
import { ProfileImage } from "../Atom/ProfileImage";
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
`;

function ChatProfileContainer({ chatsInfo, setClickedRoomIndex }: ChatProfileContainerType) {
  const profileClickEvent = (e: React.MouseEvent) => {
    const closestElement = (e.target as HTMLElement).closest(".chatProfile");
    if (!closestElement) return;
    const index = (closestElement as HTMLElement).dataset.id;
    setClickedRoomIndex(index);
  };
  return (
    <div css={ChatProfileContainerStyle} onClick={profileClickEvent}>
      {chatsInfo?.data.map((data, idx) => {
        const memberType = data.member.length > 1 ? "team" : data.member[0].sex;
        const lastChatInfo = data.chatMessage[data.chatMessage.length - 1];
        return (
          <div className="chatProfile" data-id={idx}>
            <ProfileCard type={memberType} idx={idx}>
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
