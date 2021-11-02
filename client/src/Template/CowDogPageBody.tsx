/* eslint-disable react/destructuring-assignment */
import React from "react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { CowDogPageBodyType } from "../util/type";

export default function CowDogPageBody({ datas, person, setOpenModal }: CowDogPageBodyType) {
  const handleModalClick = (e: React.MouseEvent) => {
    const { id } = (e.target as HTMLElement).dataset;
    if (id === undefined) return;

    setOpenModal((prev: number) => (prev === Number(id) ? null : Number(id)));
  };
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
    </div>
  );
}
