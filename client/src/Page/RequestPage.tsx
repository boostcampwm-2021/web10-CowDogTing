/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getRequestInfo } from "../util/dummyData";
import { ProfileType, RequestType } from "../util/type";
import useModalEvent from "../Hook/useModalEvent";

const RequestPageStyle = css`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
`;
const RequestTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10vh 0;
`;
const RequestListStyle = css`
  width: 41%;
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

export default function RequestPage() {
  const [RequestForMe, setRequestForMe] = useState<ProfileType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<ProfileType[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);

  const myId = "123";
  const person = 1;

  const modalRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalRef, () => setOpenModal(null));

  const getDatas = async () => {
    const item = await getRequestInfo();
    item?.data.forEach((data: RequestType) => {
      return data.from === myId ? setRequestForMe((prev) => [...prev, data.info]) : setRequestToMe((prev) => [...prev, data.info]);
    });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div css={RequestPageStyle}>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>나에게 온 요청</div>
        <ProfileList datas={RequestForMe} person={person} setOpenModal={setOpenModal} />
        <div ref={modalRef}>{RequestForMe && openModal !== null && <ProfileModal data={RequestForMe[Number(openModal)]} />}</div>
      </div>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>내가 보낸 요청</div>
        <ProfileList datas={RequestToMe} person={person} setOpenModal={setOpenModal} />
        <div ref={modalRef}>{RequestToMe && openModal !== null && <ProfileModal data={RequestToMe[Number(openModal)]} />}</div>
      </div>
    </div>
  );
}
