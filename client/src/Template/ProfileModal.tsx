/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import ProfileInfo from "../Atom/ProfileInfo";
import LargeModal from "../Organism/LargeModal";
import RequestModal from "./RequestModal";
import { profileModalDatas, requestTarget, userState } from "../Recoil/Atom";
// import { profileModalDatas, requestState, requestTarget, userState } from "../Recoil/Atom";
import { ProfileType } from "../util/type";
import { requestChat } from "../util/data";

export default function ProfileModal(): JSX.Element {
  const setRequestTarget = useSetRecoilState(requestTarget);
  const datas = useRecoilValue(profileModalDatas);
  // const setRequestData = useSetRecoilState(requestState);
  const { id: myId } = useRecoilValue(userState);

  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(datas[0]);
  const [request, setRequest] = useState<boolean>(false);
  // const [fromId, setFromId] = useState<number | string>(myId);
  // const [toId, setToId] = useState<string | number>("");

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
  console.log(datas);

  const handleRequestClick = (): void => {
    // if (datas.length !== 1) {
    //   console.log("team");
    //   setFromId(mygId ?? 0);
    //   setToId(datas[0].gid ?? 0);
    // } else {
    //   setToId(datas[0].id);
    //   requestChat({ from: fromId, to: toId });
    // }
    const res = requestChat({ from: myId, to: datas.length === 1 ? datas[0].id : datas[0].gid ?? 0 });
    if (!res) {
      console.log("error");
    }
    // setRequestData((prev) => {
    //   const { id } = datas[0];
    //   return [
    //     ...prev,
    //     {
    //       from: myId,
    //       to: id,
    //       info: datas[0],
    //       state: "ready",
    //     },
    //   ];
    // });
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
