/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getCowDogInfo } from "../util/dummyData";
import { ProfileType } from "../util/type";

export default function RequestPage() {
  const [datas, setDatas] = useState<ProfileType[] | null>(null);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const RequestPageStyle = css`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    justify-content: center;
  `;
  const getDatas = async () => {
    const item = await getCowDogInfo(person);
    setDatas(item);
  };

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <>
      <div css={RequestPageStyle}>
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} />

        {datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}
        <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} />

        {datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}
      </div>
      <div>나에게 온 요청</div>
    </>
  );
}
