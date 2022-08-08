import { useRef } from "react";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { ChatProfileContainer, ChatListContainer } from "@Organism/.";
import { handleModalClick } from "@Util/.";
import { ProfileModal } from "../Modal/ProfileModal";
import { useGetModalData, useToggleModal } from "./ChatListTemplate.hook";
import { ChatListTemplateStyle } from "./ChatListTemplate.style";

export const ChatListTemplate: React.FC = () => {
  const { chatsInfo, clickedRoomIndex, setClickedRoomIndex, getModalData } = useGetModalData();
  const { offModal, openModal, setOpenModal } = useToggleModal(getModalData);

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
