/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChatImageContainerType } from "../util/type";
import { ProfileImage } from "../Atom/ProfileImage";
import { Button } from "../Atom/Button";

const ChatListHeader = styled.div`
  display: flex;
  width: 100%;
  height: 5vw;
  border-bottom: 1px solid;
  align-items: center;
`;

const ChatImageContainerStyle = css`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function ChatImageContainer({ member }: ChatImageContainerType) {
  return (
    <>
      <ChatListHeader>
        <div css={ChatImageContainerStyle}>
          {member?.map((userInfo, idx) => (
            <ProfileImage type="Mini" image={userInfo.image} data-id={idx} />
          ))}
        </div>
        <Button>나가기</Button>
      </ChatListHeader>
    </>
  );
}

export default ChatImageContainer;
