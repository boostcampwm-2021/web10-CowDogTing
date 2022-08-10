import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { Button } from "@Atom/.";
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

export default function InviteModal({ handleFalseInvite }: { handleFalseInvite: Function }) {
  const userIdRef = useRef<HTMLInputElement>(null);
  const setTeamInfo = useSetRecoilState(teamState);
  const setErrorValue = useSetRecoilState(errorState);

  const clickInvite: MouseEventHandler = async () => {
    try {
      const inviteUserId = validationUserId({ userIdRef });
      inviteTeam({ userId: inviteUserId })
        .then(({ data }) => {
          setTeamInfo((prev: TeamInfoType) => ({
            ...prev,
            member: [...(prev.member ?? []), data],
          }));
          handleFalseInvite();
        })
        .catch((e) => setErrorValue({ errorStr: "초대 실패했습니다", timeOut: 1000 }));
    } catch (e) {
      setErrorValue({ errorStr: e as string, timeOut: 1000 });
    }
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

const validationUserId = ({ userIdRef }: { userIdRef: React.RefObject<HTMLInputElement> }) => {
  if (!userIdRef.current) throw new Error("시스템 에러");
  if (userIdRef.current.value === "") throw new Error("초대할 아이디를 입력해 주세요");
  return userIdRef.current.value;
};
