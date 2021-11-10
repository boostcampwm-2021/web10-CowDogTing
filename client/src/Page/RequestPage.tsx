/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ProfileModal from "../Template/ProfileModal";
import { getRequestInfo } from "../util/dummyData";
import { ProfileType, RequestType } from "../util/type";
import useModalEvent from "../Hook/useModalEvent";
import RequestList from "../Template/RequestList";

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
  const [openForModal, setOpenForModal] = useState<number | null>(null);
  const [openToModal, setOpenToModal] = useState<number | null>(null);

  const myId = "123";
  const person = 1;

  const modalForRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalForRef, () => setOpenForModal(null));
  const modalToRef = useRef<HTMLDivElement>(null);
  useModalEvent(modalToRef, () => setOpenToModal(null));

  const getDatas = async () => {
    const item = await getRequestInfo();
    item?.data.forEach((data: RequestType) => {
      console.log(data);
      return data.from === myId ? setRequestForMe((prev) => [...prev, data.info]) : setRequestToMe((prev) => [...prev, data.info]);
    });
  };

  useEffect(() => {
    if (openToModal === null) return;
    setOpenForModal(null);
  }, [openToModal]);

  useEffect(() => {
    if (openForModal === null) return;
    setOpenToModal(null);
  }, [openForModal]);

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div css={RequestPageStyle}>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>나에게 온 요청</div>
        <RequestList datas={RequestForMe} person={person} setOpenModal={setOpenForModal} />
        <div ref={modalForRef}>{RequestForMe && openForModal !== null && <ProfileModal data={RequestForMe[Number(openForModal)]} />}</div>
      </div>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>내가 보낸 요청</div>
        <RequestList datas={RequestToMe} person={person} setOpenModal={setOpenToModal} />
        <div ref={modalToRef}>{RequestToMe && openToModal !== null && <ProfileModal data={RequestToMe[Number(openToModal)]} />}</div>
      </div>
    </div>
  );
}
