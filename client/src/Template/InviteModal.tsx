/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import InputLabel from "../Molecules/InputLabel";
import { Button } from "../Atom/Button";

const inviteModalStyle = css`
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 30;
  top: 0px;
  top: 30%;
  left: 35%;
  width: 400px;
  height: 300px;
  border: 2px solid #ffcfcf;
  border-radius: 10px;
  background-color: #fff;
`;

export default function InviteModal({ teamName }: { teamName: string | undefined }) {
  const userIdRef = useRef<HTMLInputElement>(null);
  const clickInvite: MouseEventHandler = () => {
    if (userIdRef.current === null) return;
    const inviteUserId = userIdRef.current.value;
    // eslint-disable-next-line no-console
    axios.post("http://localhost:4000/api/team/invite", {
      teamName,
      userId: inviteUserId,
    });
  };
  return (
    <div css={inviteModalStyle}>
      <InputLabel refProps={userIdRef} label="초대할 ID" />
      <Button onClick={clickInvite} type="Large">
        초대하기
      </Button>
    </div>
  );
}
