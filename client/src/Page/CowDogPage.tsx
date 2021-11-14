/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import Navbar from "../Organism/Navbar";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import useModalCloseEvent from "../Hook/useModalCloseEvent";
import { cowDogState, profileModalDatas, userState } from "../Recoil/Atom";
import { getCowDogInfo } from "../util/data";
import { checkLogin, passToLoginPage } from "../util";

const ListContainer = css`
  margin: 0 auto;
`;

export default function CowDogPage() {
  const setModalDatas = useSetRecoilState(profileModalDatas);
  const [datas, setDatas] = useRecoilState(cowDogState);

  const [openModal, setOpenModal] = useState<number | null>(null);
  const [dataIndex, setDataIndex] = useState<number>(0);

  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();

  useModalCloseEvent(modalRef, profileRef, () => {
    setOpenModal(null);
  });

  const getDatas = async () => {
    const item = await getCowDogInfo(person, dataIndex);
    setDatas(item);
  };

  const addDatas = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      const item = await getCowDogInfo(person, dataIndex);
      setDatas([...datas, ...item]);
      setDataIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (openModal === null) {
      setModalDatas([]);
      return;
    }

    setModalDatas(() => {
      const data = datas[Number(openModal)];
      const { member } = data;
      const teamPerson = member || [];
      return [data, ...teamPerson];
    });
  }, [openModal]);

  useEffect(() => {
    getDatas();
    setDataIndex(0);
  }, [person]);

  useEffect(() => {
    document.addEventListener("scroll", addDatas);
    return () => {
      document.removeEventListener("scroll", addDatas);
    };
  }, [dataIndex]);

  return (
    <div>
      <Navbar />
      <div css={ListContainer}>
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} profileRef={profileRef} />
        <div ref={modalRef}>{datas && openModal !== null && <ProfileModal />}</div>
      </div>
    </div>
  );
}
