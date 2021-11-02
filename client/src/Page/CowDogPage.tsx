/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import ProfileModal from "../Template/ProfileModal";
import { getCowDogInfo } from "../util/dummyData";
import { ProfileType } from "../util/type";

export default function CowDogPage() {
  const [datas, setDatas] = useState<ProfileType[] | null>(null);
  const [openModal, setOpenModal] = useState<Number | null>(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const handleModalClick = (e: React.MouseEvent) => {
    const { id } = (e.target as HTMLElement).dataset;
    if (id === undefined) return;

    setOpenModal((prev) => (prev === Number(id) ? null : Number(id)));
  };

  const getDatas = async () => {
    const item = await getCowDogInfo(person);
    setDatas(item);
  };

  useEffect(() => {
    getDatas();
  }, []);

  if (datas && openModal !== null) console.log(datas[Number(openModal)]);
  return (
    <div>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const sex = person > 1 ? "team" : data.sex;
        return (
          <div onClick={handleModalClick} data-id={idx}>
            <ProfileCard type={sex}>
              <ProfileInfo data={data} />
            </ProfileCard>
          </div>
        );
      })}

      {datas && openModal !== null && <ProfileModal data={datas[Number(openModal)]} />}
    </div>
  );
}
