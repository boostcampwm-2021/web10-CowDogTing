/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import ProfileInfo from "../Atom/ProfileInfo";
import { Modal } from "../Molecules/Modal";
import { ProfileInfoDataType, ProfileType } from "../util/type";

export default function ProfileModal({ data }: ProfileInfoDataType): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(data);
  const [datas, setDatas] = useState<ProfileType[] | null>(null);

  useEffect(() => {
    setTarget(data);
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

  const inCreaseIndex = () => {
    setIndex((prev) => prev + 1);
    setTarget(datas ? datas[index] : null);
  };

  const decreaseIndex = () => {
    setIndex((prev) => prev - 1);
    setTarget(datas ? datas[index] : null);
  };

  if (!target) return <div>로딩중...</div>;

  return (
    <Modal type="Large">
      {index > 0 && <div onClick={decreaseIndex}>이동</div>}
      <ProfileInfo data={target} />
      {index + 1 !== datas?.length && <div onClick={inCreaseIndex}>이동</div>}
    </Modal>
  );
}
