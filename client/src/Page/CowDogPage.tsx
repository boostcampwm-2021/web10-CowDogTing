/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import Navbar from "../Organism/Navbar";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getCowDogInfo } from "../util/dummyData";
import { ProfileType } from "../util/type";

const ListContainer = css`
  width: 70%;
  margin: 0 auto;
`;

export default function CowDogPage() {
  const [datas, setDatas] = useState<ProfileType[] | null>(null);
  const [openModal, setOpenModal] = useState<number | null>(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const getDatas = async () => {
    const item = await getCowDogInfo(person);
    setDatas(item);
  };

  useEffect(() => {
    getDatas();
  }, [person]);

  return (
    <div>
      <Navbar />
      <div css={ListContainer}>
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} />
      </div>

      {datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}
    </div>
  );
}
