/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ChatProfileContainer from "../Organism/ChatProfileContainer";
import ChatListContainer from "../Organism/ChatListContainer";
import { getChatsInfo } from "../util/dummyData";
import { ChatsInfoType } from "../util/type";
import ProfileModal from "./ProfileModal";
import useModalEvent from "../Hook/useModalEvent";

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
  const [chatsInfo, setChatsInfo] = useState<ChatsInfoType | null>(null);
  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);
  const [openModal, setOpenModal] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalRef, () => setOpenModal(null));

  const changeOpenModal = (event: React.MouseEvent) => {
    const closestElement = (event.target as HTMLElement).closest(".Profile");
    if (closestElement === null) return;

    const { userid: id } = (closestElement as HTMLElement).dataset;

    if (Number(id) === openModal) {
      setOpenModal(null);
    } else {
      setOpenModal(Number(id));
    }
  };

  const getChatRoomData = async () => {
    const data = await getChatsInfo();
    setChatsInfo(data);
  };

  useEffect(() => {
    getChatRoomData();
  }, []);

  return (
    <div css={ChatListTemplateStyle} onClick={changeOpenModal}>
      <ChatProfileContainer chatsInfo={chatsInfo} setClickedRoomIndex={setClickedRoomIndex} />
      <ChatListContainer chatInfo={chatsInfo?.data[clickedRoomIndex]} />
      <div ref={modalRef}>{chatsInfo && clickedRoomIndex !== -1 && openModal !== null && <ProfileModal data={chatsInfo.data[clickedRoomIndex].member[openModal]} />}</div>
    </div>
  );
}

export default ChatListTemplate;
