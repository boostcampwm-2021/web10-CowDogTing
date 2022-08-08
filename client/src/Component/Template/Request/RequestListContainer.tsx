/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useModalCloseEvent from "../../../Hook/useModalCloseEvent";
import { profileModalDatas, teamState, userState } from "../../../Recoil/Atom";
import { RequestType } from "../../../Util/type";
import { ProfileModal } from "../Modal/ProfileModal";
import RequestList from "./RequestList";

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

export default function RequestListContainer({ datas, type }: { datas: RequestType[]; type: string }) {
  const title = type === "ForMe" ? "나에게 온 요청" : "내가 보낸 요청";

  const setModalDatas = useSetRecoilState(profileModalDatas);
  const teamInfo = useRecoilValue(teamState);
  const userInfo = useRecoilValue(userState);

  const [openModal, setOpenModal] = useState<number | null>(null);

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  useModalCloseEvent(modalRef, profileRef, () => setOpenModal(null));

  let propsType = type;

  useEffect(() => {
    if (!datas || openModal === null) return;

    const data = datas[Number(openModal)].info;
    const teamPerson = data.member || [];

    if (teamPerson.length !== 0 && !checkLeader(teamInfo.leader, userInfo.id)) propsType = "NotLeader";

    setModalDatas([data, ...teamPerson]);
  }, [openModal]);

  return (
    <div css={RequestListStyle}>
      <div css={RequestTitleStyle}>{title}</div>
      <RequestList datas={datas} setOpenModal={setOpenModal} type={propsType} profileRef={profileRef} />
      <div ref={modalRef}>{openModal !== null && <ProfileModal />}</div>
    </div>
  );
}

function checkLeader(leader: string, target: string) {
  return leader === target;
}
