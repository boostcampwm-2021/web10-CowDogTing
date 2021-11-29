/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { createTeam, getFetch } from "../util/data";
import { errorState, teamState, userState } from "../Recoil/Atom";
import { checkLogin, passToLoginPage } from "../util";
import TeamInfo from "../Organism/Info/TeamInfo";
import TeamCreateButtonContainer from "../Molecules/Team/TeamCreateButtonContainer";
import { TEAM_INFO_URL } from "../util/URL";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
  flex-direction: column;
`;

function TeamCreatePage() {
  if (!checkLogin()) passToLoginPage();

  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const [locSelected, setLocSelected] = useState<string>("");

  const setUserInfo = useSetRecoilState(userState);
  const setErrorValue = useSetRecoilState(errorState);
  const setTeamInfo = useSetRecoilState(teamState);

  const clickCreateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current) return;

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locSelected;

    if (teamName === "") {
      setErrorValue({ errorStr: "팀 이름을 입력해 주세요", timeOut: 1000 });
      return;
    }

    if (location === "") {
      setErrorValue({ errorStr: "지역을 선택해 주세요", timeOut: 1000 });
      return;
    }

    const gid = await createTeam({ teamName, teamInfo, location });
    if (gid === "error") {
      setErrorValue({ errorStr: "팀 생성에 실패했습니다", timeOut: 1000 });
      return;
    }
    const teamData = await getFetch({ url: TEAM_INFO_URL, query: "" });
    setTeamInfo(teamData);
    setUserInfo((prev) => {
      return { ...prev, gid };
    });
  };

  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfo setLocSelected={setLocSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <TeamCreateButtonContainer clickCreateButton={clickCreateButton} />
    </div>
  );
}

export default TeamCreatePage;
