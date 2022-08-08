import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatTarget, profileModalDatas } from "../../Recoil/Atom";
import { chatsState } from "../../Recoil/ChatData";

export const useGetModalData = () => {
  const chatsInfo = useRecoilValue(chatsState);
  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);

  const getModalData = (openModal: number) => {
    const datas = chatsInfo[clickedRoomIndex].member;
    return [datas[openModal]];
  };

  return { chatsInfo, clickedRoomIndex, setClickedRoomIndex, getModalData };
};

export const useToggleModal = (getModalData: Function) => {
  const chatsInfo = useRecoilValue(chatsState);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [clickedRoomIndex, setClickedRoomIndex] = useState(-1);
  const setModalDatas = useSetRecoilState(profileModalDatas);
  const setChatInfo = useSetRecoilState(chatTarget);

  const offModal = useCallback(() => setOpenModal(null), []);

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
