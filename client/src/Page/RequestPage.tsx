/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProfileModal from "../Template/ProfileModal";
import RequestList from "../Template/RequestList";
import { RequestType } from "../util/type";
import useModalCloseEvent from "../Hook/useModalCloseEvent";
import { profileModalDatas, requestState, userState } from "../Recoil/Atom";
import { checkLogin, passToLoginPage } from "../util";

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
  const { id: myId } = useRecoilValue(userState);
  const requestDatas = useRecoilValue(requestState);
  const setModalDatas = useSetRecoilState(profileModalDatas);

  const [RequestForMe, setRequestForMe] = useState<RequestType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<RequestType[]>([]);
  const [openForModal, setOpenForModal] = useState<number | null>(null);
  const [openToModal, setOpenToModal] = useState<number | null>(null);

  const person = 1;

  const profileForRef = useRef<HTMLDivElement[]>([]);
  const modalForRef = useRef<HTMLDivElement>(null);
  useModalCloseEvent(modalForRef, profileForRef, () => setOpenForModal(null));

  const profileToRef = useRef<HTMLDivElement[]>([]);
  const modalToRef = useRef<HTMLDivElement>(null);
  useModalCloseEvent(modalToRef, profileToRef, () => setOpenToModal(null));
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();

  const getDatas = () => {
    console.log(requestDatas);
    requestDatas?.forEach((data: RequestType) => {
      return data.from !== myId ? setRequestForMe((prev) => [...prev, data]) : setRequestToMe((prev) => [...prev, data]);
    });
  };

  useEffect(() => {
    if (!openToModal) return;
    setModalDatas(() => {
      const datas = RequestForMe[Number(openToModal)].info;
      const { member } = datas;
      const teamPerson = member || [];
      return [datas, ...teamPerson];
    });
    setOpenForModal(null);
  }, [openToModal]);

  useEffect(() => {
    if (!openForModal) return;
    setModalDatas(() => {
      const datas = RequestForMe[Number(openForModal)].info;
      const { member } = datas;
      const teamPerson = member || [];
      return [datas, ...teamPerson];
    });
    setOpenToModal(null);
  }, [openForModal]);

  useEffect(() => {
    getDatas();
  }, [requestDatas]);

  return (
    <div css={RequestPageStyle}>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>나에게 온 요청</div>
        <RequestList datas={RequestForMe} person={person} setOpenModal={setOpenForModal} type="ForMe" profileRef={profileForRef} />
        <div ref={modalForRef}>{RequestForMe && openForModal && <ProfileModal />}</div>
      </div>
      <div css={RequestListStyle}>
        <div css={RequestTitleStyle}>내가 보낸 요청</div>
        <RequestList datas={RequestToMe} person={person} setOpenModal={setOpenToModal} type="ToMe" profileRef={profileToRef} />
        <div ref={modalToRef}>{RequestToMe && openToModal && <ProfileModal />}</div>
      </div>
    </div>
  );
}
