/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import ProfileList from "./Profile/ProfileList";
import { errorState, teamState, userState } from "../Recoil/Atom";
import { changeTeamInfo, exitTeam } from "../util/data";
import TeamSettingButtonContainer from "../Molecules/Team/TeamSettingButtonContainer";
import TeamInfo from "../Organism/Info/TeamInfo";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;

function TeamSettingTemplate() {
  const [teamInfoState, setTeamInfoState] = useRecoilState(teamState);
  const userInfoState = useRecoilValue(userState);
  const [locSelected, setLocSelected] = useState<string>("");
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement[]>([]);
  const setErrorValue = useSetRecoilState(errorState);
  const resetInput = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected) return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    setLocSelected("");
  };
  const clickExitButton: MouseEventHandler = async () => {
    const result = await exitTeam();
    if (result === "error") {
      setErrorValue({ errorStr: "팀 탈출에 실패했습니다.", timeOut: 1000 });
    }
    window.location.replace("/main");
  };
  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current && !teamInfoRef.current && !locSelected && !teamInfoState.id) return;

    if (teamInfoState.leader !== userInfoState.id) {
      setErrorValue({ errorStr: "팀 리더가 아닙니다", timeOut: 1000 });
      return;
    }

    const result = await changeTeamInfo({
      teamName: teamNameRef?.current?.value || teamInfoState.id,
      teamInfo: teamInfoRef?.current?.value || teamInfoState.info,
      location: locSelected ?? teamInfoState.location,
    });
    if (result === "error") {
      setErrorValue({ errorStr: "팀 정보 수정에 실패했습니다.", timeOut: 1000 });
      return;
    }
    setTeamInfoState((prev) => {
      return { ...prev, ...result };
    });
    resetInput();
  };

  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfo setLocSelected={setLocSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <ProfileList datas={teamInfoState?.member} person={1} profileRef={profileRef} />
      <TeamSettingButtonContainer clickUpdateButton={clickUpdateButton} clickExitButton={clickExitButton} />
    </div>
  );
}

export default TeamSettingTemplate;
