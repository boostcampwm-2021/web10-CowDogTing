/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState } from "react";
import ProfileInfo from "../Atom/ProfileInfo";
import { ProfileInfoDataType, ProfileType } from "../util/type";
import LargeModal from "../Organism/LargeModal";

export default function ProfileModal({ data }: ProfileInfoDataType): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(data);
  const [datas, setDatas] = useState<ProfileType[] | null>(null);

  useEffect(() => {
    setTarget(data);
    setIndex(0);
  }, [data]);

  useEffect(() => {
    if (datas) {
      setTarget(datas[index]);
    }
  }, [index]);

  useEffect(() => {
    const { member } = data;
    const teamPerson = member ? member : [];
    setDatas([data, ...teamPerson]);
  }, []);

  const inCreaseIndex = (e: React.MouseEvent<HTMLElement>): void => {
    setIndex((prev) => prev + 1);
    setTarget(datas ? datas[index] : null);
  };

  const decreaseIndex = (e: React.MouseEvent<HTMLElement>): void => {
    setIndex((prev) => prev - 1);
    setTarget(datas ? datas[index] : null);
  };

  if (!target) return <div>로딩중...</div>;

  return (
    <LargeModal index={index} datas={datas} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
      <ProfileInfo data={target} />
      <div>채팅 신청하기</div>
    </LargeModal>
  );
}
