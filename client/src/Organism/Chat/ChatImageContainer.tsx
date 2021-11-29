/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChatImageContainerType } from "../../util/type";
import ProfileImage from "../../Atom/ProfileImage";
import { Button } from "../../Atom/Button";
import { chatTarget, userState } from "../../Recoil/Atom";

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

function ChatImageContainer({ profileRef }: ChatImageContainerType) {
  const { member } = useRecoilValue(chatTarget);
  const { id: myId } = useRecoilValue(userState);

  const history = useHistory();

  const handleCloseRoomClick = () => {
    history.push("/main");
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
}

export default ChatImageContainer;
