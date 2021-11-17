/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ChatProfileContainer from "../Organism/ChatProfileContainer";
import ChatListContainer from "../Organism/ChatListContainer";
import ProfileModal from "./ProfileModal";
import useModalCloseEvent from "../Hook/useModalCloseEvent";
import { chatsState, chatTarget, profileModalDatas } from "../Recoil/Atom";

const ChatListTemplateStyle = css`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  border: 1px solid;
  border-top: none;
  min-width: 920px;
`;

function ChatListTemplate() {
  const chatsInfo = useRecoilValue(chatsState);
  const setChatInfo = useSetRecoilState(chatTarget);
  const setModalDatas = useSetRecoilState(profileModalDatas);

  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);
  const [openModal, setOpenModal] = useState<number | null>(null);

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useModalCloseEvent(modalRef, profileRef, () => {
    setOpenModal(null);
  });

  useEffect(() => {
    if (openModal === null) {
      setModalDatas([]);
      return;
    }
    setModalDatas(() => {
      const datas = chatsInfo[clickedRoomIndex].member;
      return [datas[openModal]];
    });
  }, [openModal]);

  useEffect(() => {
    if (clickedRoomIndex === -1) return;
    setChatInfo(chatsInfo[clickedRoomIndex]);
  }, [clickedRoomIndex]);

  return (
    <div css={ChatListTemplateStyle}>
      <ChatProfileContainer chatsInfo={chatsInfo} setClickedRoomIndex={setClickedRoomIndex} />
      <ChatListContainer profileRef={profileRef} setOpenModal={setOpenModal} />
      <div ref={modalRef}>{chatsInfo && clickedRoomIndex !== -1 && openModal !== null && <ProfileModal />}</div>
    </div>
  );
}

export default ChatListTemplate;
