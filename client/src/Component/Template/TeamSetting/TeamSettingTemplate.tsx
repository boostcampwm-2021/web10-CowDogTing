import React, { MouseEventHandler, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { errorState } from "@Recoil/Atom";
import { changeTeamInfo, exitTeam } from "@Util/data";
import { TeamSettingButtonContainer } from "@Molecules/.";
import { TeamInfo } from "@Organism/.";
import { teamState } from "@Recoil/TeamData";
import { userState } from "@Recoil/UserData";
import { useMovePage } from "@Hook/useMovePage";
import { ProfileList } from "../Profile/ProfileList";
import { teamUpdateDataValidation, useLocationSelectHook } from "./TeamCreateTemplate.hook";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;

export const TeamSettingTemplate: React.FC = () => {
  const [locSelected, handleLocationSelected, handleLocationInit] = useLocationSelectHook();
  const [goMain] = useMovePage("/main");

  const [teamInfoState, setTeamInfoState] = useRecoilState(teamState);
  const userInfoState = useRecoilValue(userState);
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement[]>([]);
  const setErrorValue = useSetRecoilState(errorState);

  const resetInput = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected) return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    handleLocationInit();
  };

  const clickExitButton: MouseEventHandler = () =>
    exitTeam()
      .then((res) => goMain())
      .catch((e) => setErrorValue({ errorStr: e as string, timeOut: 1000 }));

  const clickUpdateButton: MouseEventHandler = async () => {
    try {
      const value = teamUpdateDataValidation({ teamNameRef, teamInfoRef, locSelected, teamInfoState, userInfoState });
      const res = await changeTeamInfo(value);
      setTeamInfoState((prev) => ({ ...prev, ...res }));
      resetInput();
    } catch (e) {
      setErrorValue({ errorStr: e as string, timeOut: 1000 });
    }
  };
  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfo locSelected={locSelected} handleLocationSelected={handleLocationSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <ProfileList handleProfileListContainer={() => {}} datas={teamInfoState?.member} person={1} profileRef={profileRef} />
      <TeamSettingButtonContainer clickUpdateButton={clickUpdateButton} clickExitButton={clickExitButton} />
    </div>
  );
};
