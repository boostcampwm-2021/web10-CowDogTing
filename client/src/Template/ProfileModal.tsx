/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ProfileInfo from "../Atom/ProfileInfo";
import { ProfileInfoDataType, ProfileType } from "../util/type";
import LargeModal from "../Organism/LargeModal";
import { Button } from "../Atom/Button";
import RequestModal from "./RequestModal";
import { requestTarget } from "../Recoil/Atom";

export default function ProfileModal({ data }: ProfileInfoDataType): JSX.Element {
  const setRequestTarget = useSetRecoilState(requestTarget);

  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(data);
  const [datas, setDatas] = useState<ProfileType[] | null>(null);
  const [request, setRequest] = useState<boolean>(false);

  useEffect(() => {
    if (datas === null) return;
    setRequestTarget(datas[0]);
  }, [datas]);

  useEffect(() => {
    const { member } = data;
    const teamPerson = member || [];
    setTarget(data);
    setIndex(0);
    setDatas([data, ...teamPerson]);
    if (datas) console.log(datas);
  }, [data]);

  useEffect(() => {
    if (datas) {
      setTarget(datas[index]);
    }
  }, [index]);

  const inCreaseIndex = (): void => {
    setIndex((prev) => prev + 1);
    setTarget(datas ? datas[index] : null);
  };

  const decreaseIndex = (): void => {
    setIndex((prev) => prev - 1);
    setTarget(datas ? datas[index] : null);
  };

  const requestChat = (): void => {
    if (datas === null) return;
    console.log(datas[0]);
    console.log("소켓연동 후");
    setRequest(true);
  };
  if (!target) return <div>로딩중...</div>;

  return (
    <>
      <LargeModal index={index} datas={datas} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
        <ProfileInfo data={target} />
        <Button type="Large" onClick={requestChat}>
          채팅 신청하기
        </Button>
      </LargeModal>
      {request && datas && <RequestModal setRequest={setRequest} />}
    </>
  );
}
