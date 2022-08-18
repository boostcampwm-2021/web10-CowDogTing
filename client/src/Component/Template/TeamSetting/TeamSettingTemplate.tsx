import React, { MouseEventHandler, useRef } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { errorState } from "@Recoil/Atom";
import { changeTeamInfo, exitTeam } from "@Common/api";
import { TeamSettingButtonContainer } from "@Molecules/.";
import { TeamInfo } from "@Organism/.";
import { teamStateSelector } from "@Recoil/TeamData";
import { userStateSelector } from "@Recoil/UserData";
import { useMovePage } from "@Hook/useMovePage";
import { ProfileList } from "../Profile/ProfileList";
import { teamUpdateDataValidation, useLocationSelectHook, useTeamInfoHandler, useTeamInfoInputHandler } from "./TeamCreateTemplate.hook";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;

export const TeamSettingTemplate: React.FC = () => {
  const [goMain] = useMovePage("/main");

  const [teamInfoState, resetTeamInfo] = useTeamInfoHandler();
  const userInfoState = useRecoilValue(userStateSelector);

  const [locSelected, handleLocationSelected, handleLocationInit] = useLocationSelectHook(teamInfoState.location);
  const { teamNameRef, teamInfoRef, profileRef, resetInputHandler } = useTeamInfoInputHandler();
  const resetInput = resetInputHandler(locSelected, handleLocationInit);
  const setErrorValue = useSetRecoilState(errorState);

  const clickExitButton: MouseEventHandler = () =>
    exitTeam()
      .then((res) => goMain())
      .catch((e) => setErrorValue({ errorStr: e as string, timeOut: 1000 }));

  const clickUpdateButton: MouseEventHandler = async () => {
    try {
      const value = teamUpdateDataValidation({ teamNameRef, teamInfoRef, locSelected, teamInfoState, userInfoState });
      await changeTeamInfo(value);
      resetTeamInfo();
      resetInput();
    } catch (e) {
      setErrorValue({ errorStr: (e as any).message as string, timeOut: 1000 });
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
