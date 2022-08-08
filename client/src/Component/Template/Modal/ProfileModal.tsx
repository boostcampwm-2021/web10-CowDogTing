/* eslint-disable no-console */
import React from "react";
import { Button } from "@Atom/Button";
import ProfileInfo from "@Atom/ProfileInfo";
import LargeModal from "@Core/LargeModal";
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
        <Button type="Large" onClick={handleRequestClick}>
          채팅 신청하기
        </Button>
      </LargeModal>
      {request && <RequestModal setRequest={setRequest} />}
    </>
  );
};
