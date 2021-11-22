/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import ProfileList from "./Profile/ProfileList";
import { errorState, teamState, userState } from "../Recoil/Atom";
import { changeTeamInfo } from "../util/data";
import TeamInfo from "../Organism/Info/TeamInfo";
import TeamSettingButtonContainer from "../Molecules/Team/TeamSettingButtonContainer";
import { fetchGet } from "../Recoil/Selector";
import { TEAM_INFO_URL } from "../util/URL";

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
  const teamSelector = useRecoilValue(fetchGet({ url: TEAM_INFO_URL, query: "" }));

  // eslint-disable-next-line no-console
  useEffect(() => {
    if (teamInfoState.id !== "") return;
    setTeamInfoState(teamSelector);
  }, [teamSelector]);

  const resetInput = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected) return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    setLocSelected("");
  };

  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected || !teamInfoState.id) return;

    if (teamInfoState.leader !== userInfoState.id) {
      setErrorValue({ errorStr: "팀 리더가 아닙니다", timeOut: 1000 });
      return;
    }

    const result = await changeTeamInfo({
      teamName: teamNameRef.current.value,
      teamInfo: teamInfoRef.current.value,
      location: locSelected,
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
      <TeamSettingButtonContainer clickUpdateButton={clickUpdateButton} />
    </div>
  );
}

export default TeamSettingTemplate;
