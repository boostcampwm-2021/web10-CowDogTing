/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import ProfileList from "./ProfileList";
import { errorState, teamState, userState } from "../Recoil/Atom";
import { changeTeamInfo } from "../util/data";
import TeamInfo from "../Container/TeamInfo";
import TeamSettingButtonContainer from "../Container/TeamSettingButtonContainer";

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

  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected) return;
    if (!teamInfoState.id) return;
    if (teamInfoState.leader !== userInfoState.id) {
      // eslint-disable-next-line no-alert
      setErrorValue({ errorStr: "팀 리더가 아닙니다", timeOut: 1000 });
      return;
    }

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locSelected;

    const result = await changeTeamInfo({
      teamName,
      teamInfo,
      location,
    });
    setTeamInfoState((prev) => {
      return { ...prev, ...result };
    });
    resetInput();
  };

  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfo setLocSelected={setLocSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <ProfileList datas={teamInfoState?.member} person={1} profileRef={profileRef} />
      <TeamSettingButtonContainer clickUpdateButton={clickUpdateButton} />
    </div>
  );
}

export default TeamSettingTemplate;
