/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { Button } from "./Button";
import { RequestType } from "../util/type";
import { requestAccept, requestDeny } from "../util/data";
import { userState } from "../Recoil/Atom";

const StateStyle = css`
  width: 130px;
  height: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  cursor: default;
  border: 2px solid #ffcfcf;
`;

export default function RequestButton({ type, data }: { type: string; data: RequestType }) {
  const { id: myId, gid: mygId } = useRecoilValue(userState);
  const {
    info: { id },
  } = data;
  const toId = data.info.member?.length === 0 ? myId : mygId;
  const handleAcceptClick = () => {
    requestAccept({ from: id, to: toId ?? myId });
  };

  const handleDenyClick = () => {
    requestDeny({ from: id, to: toId ?? myId });
  };

  const { state } = data;

  if (type === "ForMe") {
    return (
      <>
        <Button type="small" onClick={handleAcceptClick}>
          수락
        </Button>
        <Button type="small" onClick={handleDenyClick}>
          거절
        </Button>
      </>
    );
  }
  if (type === "NotLeader") return <span>팀장 아니면 꺼지셈</span>;
  return <div css={StateStyle}>{state}</div>;
}
