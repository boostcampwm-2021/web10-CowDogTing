/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import Navbar from "../Organism/Navbar";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
// import { getCowDogInfo } from "../util/dummyData";
// import { ProfileType } from "../util/type";
import useModalEvent from "../Hook/useModalEvent";
import { cowDogState } from "../Recoil/Atom";
import { getCowDogInfo } from "../util";

const ListContainer = css`
  margin: 0 auto;
`;

export default function CowDogPage() {
  // const [datas, setDatas] = useState<ProfileType[] | null>(null);
  const [datas, setDatas] = useRecoilState(cowDogState);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalRef, profileRef, () => setOpenModal(null));

  const getDatas = async () => {
    const item = await getCowDogInfo(person, dataIndex);
    setDatas(item);
  };

  const addDatas = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      const item = await getCowDogInfo(person, dataIndex);
      setDatas([...datas, ...item]);
    }
  };

  useEffect(() => {
    // if (datas[datas.length - 1].idx === undefined) return;
    // setDataIndex(datas[datas.length - 1].idx);
  }, [datas]);

  useEffect(() => {
    getDatas();
    setDataIndex(0);
  }, [person]);

  useEffect(() => {
    document.addEventListener("scroll", addDatas);
    return () => {
      document.removeEventListener("scroll", addDatas);
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div css={ListContainer}>
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} profileRef={profileRef} />
        <div ref={modalRef}>{datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}</div>
      </div>
    </div>
  );
}
