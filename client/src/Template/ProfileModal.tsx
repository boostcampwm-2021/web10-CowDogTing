/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import ProfileInfo from "../Atom/ProfileInfo";
import LargeModal from "../Organism/LargeModal";
import RequestModal from "./RequestModal";
import { profileModalDatas, requestTarget } from "../Recoil/Atom";
import { ProfileType } from "../util/type";

export default function ProfileModal(): JSX.Element {
  const setRequestTarget = useSetRecoilState(requestTarget);
  const datas = useRecoilValue(profileModalDatas);

  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(datas[0]);
  const [request, setRequest] = useState<boolean>(false);

  useEffect(() => {
    setTarget(datas[0]);
    setIndex(0);
  }, [datas]);

  useEffect(() => {
    if (!datas) return;
    setTarget(datas[index]);
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
    if (!datas) return;
    console.log("소켓연동 후");
    setRequestTarget(datas[0]);
    setRequest(true);
  };
  if (!target) return <div>로딩중...</div>;

  return (
    <>
      <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
        <ProfileInfo data={target} />
        <Button type="Large" onClick={requestChat}>
          채팅 신청하기
        </Button>
      </LargeModal>
      {request && <RequestModal setRequest={setRequest} />}
    </>
  );
}
