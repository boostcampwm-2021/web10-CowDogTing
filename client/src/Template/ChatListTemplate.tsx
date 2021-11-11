/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ChatProfileContainer from "../Organism/ChatProfileContainer";
import ChatListContainer from "../Organism/ChatListContainer";
import ProfileModal from "./ProfileModal";
import useModalEvent from "../Hook/useModalEvent";
import { fetchGet } from "../Recoil/Selector";
import { chatsState } from "../Recoil/Atom";

const ChatListTemplateStyle = css`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  border: 1px solid;
`;

function ChatListTemplate() {
  const chatInfoUrl = `${process.env.REACT_APP_GET_CHAT_INFO_API_URL}`;
  const chatsInfo = useRecoilValue(fetchGet({ url: chatInfoUrl, query: "" }));
  const setChatsInfo = useSetRecoilState(chatsState);

  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);
  const [openModal, setOpenModal] = useState<number | null>(null);

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalRef, profileRef, () => setOpenModal(null));

  const changeOpenModal = (e: React.MouseEvent) => {
    if (profileRef.current === null) {
      setOpenModal(null);
      return;
    }
    const target: HTMLElement = e.target as HTMLElement;
    if (modalRef.current?.contains(target)) {
      return;
    }
    const clickCard = profileRef.current
      .map((ref) => {
        if (ref.contains(target)) return ref;
        return null;
      })
      .filter((ref) => ref !== null)[0];

    if (!clickCard) {
      setOpenModal(null);
      return;
    }

    const { id } = clickCard.dataset;

    if (Number(id) === openModal) {
      setOpenModal(null);
    } else {
      setOpenModal(Number(id));
    }
  };

  useEffect(() => {
    setChatsInfo(chatsInfo);
  }, [chatsInfo]);

  return (
    <div css={ChatListTemplateStyle} onClick={changeOpenModal}>
      <ChatProfileContainer chatsInfo={chatsInfo} setClickedRoomIndex={setClickedRoomIndex} />
      <ChatListContainer chatInfo={chatsInfo?.data[clickedRoomIndex]} profileRef={profileRef} />
      <div ref={modalRef}>{chatsInfo && clickedRoomIndex !== -1 && openModal !== null && <ProfileModal data={chatsInfo.data[clickedRoomIndex].member[openModal]} />}</div>
    </div>
  );
}

export default ChatListTemplate;
