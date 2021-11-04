/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ProfileList from "../Template/ProfileList";
import ProfileModal from "../Template/ProfileModal";
import { getRequestInfo } from "../util/dummyData";
import { ProfileType, RequestType } from "../util/type";

export default function RequestPage() {
  const [RequestForMe, setRequestForMe] = useState<ProfileType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<ProfileType[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const myId = "123";
  const person = 1;

  const RequestPageStyle = css`
    margin: 10vh 0 0 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    justify-content: center;
  `;
  const RequestTitleStyle = css`
    font-size: 20px;
    font-weight: bold;
  `;
  const RequestListStyle = css`
    width: 30vw;
    display: flex;
    flex-direction: column;
  `;

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
    <>
      <div css={RequestPageStyle}>
        <div css={RequestListStyle}>
          <div css={RequestTitleStyle}>나에게 온 요청</div>
          <ProfileList datas={RequestForMe} person={person} setOpenModal={setOpenModal} />
          {RequestForMe && openModal !== null && <ProfileModal data={RequestForMe[Number(openModal)]} />}
        </div>
        <div css={RequestListStyle}>
          <div css={RequestTitleStyle}>내가 보낸 요청</div>
          <ProfileList datas={RequestToMe} person={person} setOpenModal={setOpenModal} />
          {RequestToMe && openModal !== null && <ProfileModal data={RequestToMe[Number(openModal)]} />}
        </div>
      </div>
    </>
  );
}
