import React, { useRef } from "react";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { ChatProfileContainer, ChatListContainer } from "@Organism/.";
import { useToggleModal } from "@Page/ChatListPage/ChatListPage.hook";
import { ProfileModal } from "@Template/Modal/ProfileModal";
import { handleModalClick } from "@Common/util";
import { ChatListTemplateStyle } from "./ChatListPage.style";

export const ChatListPage: React.FC = () => {
  const { offModal, openModal, setOpenModal, chatsInfo, clickedRoomIndex, setClickedRoomIndex } = useToggleModal();

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleChatListContainer = handleModalClick(profileRef, setOpenModal);
  useModalCloseEvent(modalRef, profileRef, offModal);

  return (
    <div css={ChatListTemplateStyle}>
      <ChatProfileContainer chatsInfo={chatsInfo} setClickedRoomIndex={setClickedRoomIndex} />
      <ChatListContainer profileRef={profileRef} onClick={handleChatListContainer} />
      <div ref={modalRef}>{chatsInfo && clickedRoomIndex !== -1 && openModal !== null && <ProfileModal />}</div>
    </div>
  );
};
