import React from "react";
import { ProfileInfo, Button } from "@Atom/.";
import { LargeModal } from "@Core/.";
import { RequestModal } from "./RequestModal";
import { useDataIndex, useRequestDate } from "./ProfileModal.hook";

export const ProfileModal: React.FC = () => {
  const { request, setRequest, datas, handleRequestClick } = useRequestDate();
  const { inCreaseIndex, decreaseIndex, index, target } = useDataIndex(datas);

  if (!target) return <div>로딩중...</div>;

  return (
    <>
      <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
        <ProfileInfo data={target} />
        <Button size="Large" onClick={handleRequestClick}>
          채팅 신청하기
        </Button>
      </LargeModal>
      {request && <RequestModal setRequest={setRequest} />}
    </>
  );
};
