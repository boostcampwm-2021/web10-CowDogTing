/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChatImageContainerType } from "../util/type";
import { ProfileImage } from "../Atom/ProfileImage";
import { Button } from "../Atom/Button";
import ProfileModal from "../Template/ProfileModal";

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
  const [openModal, setOpenModal] = useState<number | null>(null);
  const changeOpenModal = (event: React.MouseEvent) => {
    const { id } = (event.target as HTMLElement).dataset;
    if (id === undefined) {
      setOpenModal(null);
    } else if (id !== undefined) {
      setOpenModal(Number(id));
    }
  };
  return (
    <>
      <ChatListHeader onClick={changeOpenModal}>
        <div css={ChatImageContainerStyle}>
          {member?.map((userInfo, idx) => (
            <ProfileImage type="Mini" image={userInfo.image} data-id={idx} />
          ))}
        </div>
        <Button>나가기</Button>
      </ChatListHeader>
      {member && openModal !== null && <ProfileModal data={member[openModal]} />}
    </>
  );
}

export default ChatImageContainer;
