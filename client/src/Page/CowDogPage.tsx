/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Organism/Navbar";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getCowDogInfo } from "../util/dummyData";
import { ProfileType } from "../util/type";

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
  }, []);

  return (
    <div>
      <Navbar />
      <ProfileList datas={datas} person={person} setOpenModal={setOpenModal} />

      {datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}
    </div>
  );
}
