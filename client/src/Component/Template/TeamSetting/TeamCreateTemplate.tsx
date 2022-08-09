import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { errorState } from "@Recoil/Atom";
import { TeamInfo } from "@Organism/.";
import { TeamCreateButtonContainer } from "@Molecules/.";
import { userState } from "@Recoil/UserData";
import { teamState } from "@Recoil/TeamData";
import { postCreateTeam, useLocationSelectHook, validationRefData } from "./TeamCreateTemplate.hook";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
  flex-direction: column;
`;

export const TeamCreateTemplate: React.FC = () => {
  const [locSelected, handleLocationSelected] = useLocationSelectHook();
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);

  const setUserInfo = useSetRecoilState(userState);
  const setTeamInfo = useSetRecoilState(teamState);
  const setErrorValue = useSetRecoilState(errorState);

  const clickCreateButton: MouseEventHandler = async () => {
    try {
      const value = validationRefData({ teamNameRef, teamInfoRef, locSelected });
      const res = await postCreateTeam(value as Exclude<typeof value, undefined>);
      const { gid, teamData } = res as Exclude<typeof res, undefined>;
      setTeamInfo(teamData);
      setUserInfo((prev) => ({ ...prev, gid }));
    } catch (e) {
      setErrorValue({ errorStr: e as string, timeOut: 1000 });
    }
  };

  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfo locSelected={locSelected} handleLocationSelected={handleLocationSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <TeamCreateButtonContainer clickCreateButton={clickCreateButton} />
    </div>
  );
};
