/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import { inviteTeam } from "../util/data";

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

export default function InviteModal() {
  const userIdRef = useRef<HTMLInputElement>(null);

  const clickInvite: MouseEventHandler = async () => {
    if (userIdRef.current === null) return;
    const inviteUserId = userIdRef.current.value;
    const result = await inviteTeam({ userId: inviteUserId });
    // eslint-disable-next-line no-console
    console.log(result);
    window.location.replace("/sub/teamSetting");
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
