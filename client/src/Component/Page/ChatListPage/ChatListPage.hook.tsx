import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatSelector } from "@Recoil/ChatData";
import { chatTarget, profileModalDatas } from "@Recoil/Atom";

export const useToggleModal = () => {
  const chatsInfo = useRecoilValue(chatSelector);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);
  const setModalDatas = useSetRecoilState(profileModalDatas);
  const setChatInfo = useSetRecoilState(chatTarget);

  const offModal = useCallback(() => setOpenModal(null), []);

  const getModalData = (openModal: number) => {
    const datas = chatsInfo[clickedRoomIndex].member;
    return [datas[openModal]];
  };

  useEffect(() => {
    if (openModal === null) {
      setModalDatas([]);
      return;
    }
    setModalDatas(() => getModalData(openModal));
  }, [openModal]);

  useEffect(() => {
    if (clickedRoomIndex === -1) return;
    setChatInfo(chatsInfo[clickedRoomIndex]);
  }, [clickedRoomIndex]);

  return { clickedRoomIndex, offModal, setClickedRoomIndex, chatsInfo, openModal, setOpenModal };
};
