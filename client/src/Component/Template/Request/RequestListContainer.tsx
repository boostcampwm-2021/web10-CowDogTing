import React, { useRef } from "react";
import { css } from "@emotion/react";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { RequestType } from "@Util/type";
import { handleModalClick } from "@Util/.";
import { ProfileModal } from "../Modal/ProfileModal";
import RequestList from "./RequestList";
import { usePropsTypeHook, useRequestModalStateControl } from "./RequestListContainer.hook";

export default function RequestListContainer({ datas, type }: { datas: RequestType[]; type: string }) {
  const title = type === "ForMe" ? "나에게 온 요청" : "내가 보낸 요청";
  const propsType = usePropsTypeHook(type);

  const [openModal, setOpenModal] = useRequestModalStateControl(datas);
  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleRequestListContainer = handleModalClick(profileRef, setOpenModal);
  useModalCloseEvent(modalRef, profileRef, () => setOpenModal(null));

  return (
    <div css={RequestListStyle}>
      <div css={RequestTitleStyle}>{title}</div>
      <RequestList datas={datas} handleRequestListContainer={handleRequestListContainer} type={propsType} profileRef={profileRef} />
      <div ref={modalRef}>{openModal !== null && <ProfileModal />}</div>
    </div>
  );
}

const RequestListStyle = css`
  width: 41%;
  min-width: 590px;
  display: flex;
  align-items: space-around;
  justify-content: space-between;
  flex-direction: column;

  border: 1px solid #000000;
  border-top: none;
  overflow: auto;
  & + & {
    border-left: none;
  }
`;

const RequestTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10vh 0;
`;
