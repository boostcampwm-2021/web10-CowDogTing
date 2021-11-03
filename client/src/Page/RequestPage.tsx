/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getRequestInfo } from "../util/dummyData";
import { ProfileType, RequestsType, RequestType } from "../util/type";

export default function RequestPage() {
  const [datas, setDatas] = useState<RequestsType | null>(null);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const myId = "123";
  const person = 1;
  const [RequestForMe, setRequestForMe] = useState<ProfileType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<ProfileType[]>([]);

  const RequestPageStyle = css`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    justify-content: center;
  `;
  const RequestListStyle = css`
    display: flex;
    flex-direction: column;
  `;
  const getDatas = async () => {
    const item = await getRequestInfo();
    setDatas(item);
    divideRequest();
  };

  const divideRequest = () => {
    datas?.data.forEach((data: RequestType) => {
      return data.from === myId ? setRequestForMe((prev) => [...prev, data.info]) : setRequestToMe((prev) => [...prev, data.info]);
    });
  };

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <>
      <div css={RequestPageStyle}>
        <div css={RequestListStyle}>
          <div>나에게 온 요청</div>
          <ProfileList datas={RequestForMe} person={person} setOpenModal={setOpenModal} />
          {datas && openModal !== null && <ProfileModal data={RequestForMe[Number(openModal)]} />}
        </div>
        <div css={RequestListStyle}>
          <div>내가 보낸 요청</div>
          <ProfileList datas={RequestToMe} person={person} setOpenModal={setOpenModal} />
          {datas && openModal !== null && <ProfileModal data={RequestToMe[Number(openModal)]} />}
        </div>
      </div>
    </>
  );
}
