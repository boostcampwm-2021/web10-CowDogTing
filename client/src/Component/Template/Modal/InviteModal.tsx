import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { Button } from "@Atom/Button";
import { InputLabel } from "@Core/InputLabel";
import { inviteTeam } from "@Util/data";
import { TeamInfoType } from "@Util/type";
import { errorState } from "@Recoil/Atom";
import { teamState } from "@Recoil/TeamData";

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

export default function InviteModal({ setInviteModalState }: { setInviteModalState: Function }) {
  const userIdRef = useRef<HTMLInputElement>(null);
  const setTeamInfo = useSetRecoilState(teamState);
  const setErrorValue = useSetRecoilState(errorState);

  const clickInvite: MouseEventHandler = async () => {
    if (!userIdRef.current) {
      return;
    }
    const inviteUserId = userIdRef.current.value;
    if (inviteUserId === "") {
      setErrorValue({ errorStr: "초대할 아이디를 입력해 주세요", timeOut: 1000 });
      return;
    }
    const result = await inviteTeam({ userId: inviteUserId });
    if (result === "error") {
      setErrorValue({ errorStr: "초대 실패했습니다", timeOut: 1000 });
      return;
    }
    setTeamInfo((prev: TeamInfoType) => {
      const teamMember = prev.member ?? [];
      return {
        ...prev,
        member: [...teamMember, result],
      };
    });
    setInviteModalState(false);
  };
  return (
    <div css={inviteModalStyle}>
      <InputLabel refProps={userIdRef} label="초대할 ID" />
      <Button onClick={clickInvite} size="Large">
        초대하기
      </Button>
    </div>
  );
}
