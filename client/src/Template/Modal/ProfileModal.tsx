/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../../Atom/Button";
import ProfileInfo from "../../Atom/ProfileInfo";
import LargeModal from "../../Organism/Core/LargeModal";
import RequestModal from "./RequestModal";
import { errorState, profileModalDatas, requestTarget, teamState, userState } from "../../Recoil/Atom";
import { ProfileType } from "../../util/type";
import { requestChat } from "../../util/data";

export default function ProfileModal(): JSX.Element {
  const setRequestTarget = useSetRecoilState(requestTarget);
  const datas = useRecoilValue(profileModalDatas);
  const { leader } = useRecoilValue(teamState);
  const { id: myId } = useRecoilValue(userState);
  const setErrorValue = useSetRecoilState(errorState);

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
    if (datas.length > 1 && myId !== leader) {
      setErrorValue({ errorStr: "팀 리더에게 문의하세요.", timeOut: 1000 });
      return;
    }
    const res = requestChat({ from: myId, to: datas.length === 1 ? datas[0].id : datas[0].gid ?? 0 });
    if (!res) {
      console.log("error");
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
