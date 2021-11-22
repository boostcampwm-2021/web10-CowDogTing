/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../../Atom/Button";
import ProfileInfo from "../../Atom/ProfileInfo";
import LargeModal from "../../Organism/Core/LargeModal";
import RequestModal from "./RequestModal";
import { profileModalDatas, requestTarget, userState } from "../../Recoil/Atom";
import { ProfileType } from "../../util/type";
import { requestChat } from "../../util/data";

export default function ProfileModal(): JSX.Element {
  const setRequestTarget = useSetRecoilState(requestTarget);
  const datas = useRecoilValue(profileModalDatas);
  const { id: myId } = useRecoilValue(userState);

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

  const handleRequestClick = (): void => {
    const res = requestChat({ from: myId, to: datas[0].id });

    if (!res) {
      console.log("error 처리");
      return;
    }
    setRequestTarget(datas[0]);
    setRequest(true);
  };
  if (!target) return <div>로딩중...</div>;

  return (
    <>
      <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
        <ProfileInfo data={target} />
        <Button type="Large" onClick={handleRequestClick}>
          채팅 신청하기
        </Button>
      </LargeModal>
      {request && <RequestModal setRequest={setRequest} />}
    </>
  );
}
