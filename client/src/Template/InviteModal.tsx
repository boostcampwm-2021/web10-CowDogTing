/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import InputLabel from "../Molecules/InputLabel";
import { Button } from "../Atom/Button";
import { inviteTeam } from "../util";

const inviteModalStyle = css`
  position: absolute;
  z-index: 30;
  left: 300px;
  top: 300px;
  width: 400px;
  height: 400px;
`;

export default function InviteModal() {
  const userIdRef = useRef<HTMLInputElement>(null);
  const clickInvite: MouseEventHandler = async () => {
    if (userIdRef.current === null) return;
    const inviteUserId = userIdRef.current.value;
    const result = await inviteTeam({ userId: inviteUserId });
    // eslint-disable-next-line no-console
    console.log(result);
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
