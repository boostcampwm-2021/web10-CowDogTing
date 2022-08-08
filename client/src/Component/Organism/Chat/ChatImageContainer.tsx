import React from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChatImageContainerType } from "@Util/type";
import { ProfileImage, Button } from "@Atom/.";
import { chatTarget } from "../../../Recoil/Atom";
import { userState } from "@Recoil/UserData";
import { useNavigate } from "react-router-dom";

const ChatListHeader = styled.div`
  display: flex;
  width: 100%;
  height: 5vw;
  border-bottom: 1px solid;
  align-items: center;
  min-height: 60px;
  padding-right: 10px;
  min-width: 520px;
`;

const ChatImageContainerStyle = css`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ChatImageContainer = ({ profileRef }: ChatImageContainerType) => {
  const { member } = useRecoilValue(chatTarget);
  const { id: myId } = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleCloseRoomClick = () => {
    navigate("/main");
  };

  return (
    <ChatListHeader>
      <div css={ChatImageContainerStyle}>
        {member?.map((userInfo, idx) => {
          if (userInfo.id === myId) return;
          return <ProfileImage type="Mini" image={userInfo.image} ref={(el: any) => ((profileRef.current as HTMLDivElement[])[idx] = el as HTMLImageElement)} data-id={idx} />;
        })}
      </div>
      <Button onClick={handleCloseRoomClick}>나가기</Button>
    </ChatListHeader>
  );
};
