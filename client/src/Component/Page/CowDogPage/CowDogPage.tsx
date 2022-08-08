/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Organism/Core/Navbar";
import { ProfileList } from "../../Template/Profile/ProfileList";
import { ProfileModal } from "../../Template/Modal/ProfileModal";
import useModalCloseEvent from "../../../Hook/useModalCloseEvent";
import { cowDogState, profileModalDatas } from "../../../Recoil/Atom";
import { getCowDogInfo } from "../../../util/data";
import { checkLogin, makeCategory, passToLoginPage } from "../../../util";

const ListContainer = css`
  margin: 0 auto;
`;

export const CowDogPage: React.FC = () => {
  if (!checkLogin()) passToLoginPage();

  const setModalDatas = useSetRecoilState(profileModalDatas);
  const [datas, setDatas] = useRecoilState(cowDogState);

  const [openModal, setOpenModal] = useState<number | null>(null);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useModalCloseEvent(modalRef, profileRef, () => {
    setOpenModal(null);
  });

  const getDatas = async () => {
    const filterCategory = makeCategory(category);
    const item = await getCowDogInfo(person, 0, filterCategory);
    setDatas(item);
    setDataIndex(1);
  };

  const addDatas = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      const filterCategory = makeCategory(category);
      const item = await getCowDogInfo(person, dataIndex, filterCategory);
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
  }, [person, category]);

  useEffect(() => {
    document.addEventListener("scroll", addDatas);
    return () => {
      document.removeEventListener("scroll", addDatas);
    };
  }, [dataIndex, category]);

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <div css={ListContainer}>
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} profileRef={profileRef} />
        <div ref={modalRef}>{datas && openModal !== null && <ProfileModal />}</div>
      </div>
    </div>
  );
};
