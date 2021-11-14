/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createTeam } from "../util/data";
import { errorState, userState } from "../Recoil/Atom";
import { checkLogin, passToLoginPage } from "../util";
import TeamInfo from "../Organism/TeamInfo";
import TeamCreateButtonContainer from "../Molecules/TeamCreateButtonContainer";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
  flex-direction: column;
`;

function TeamCreatePage() {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const [locSelected, setLocSelected] = useState<string>("");

  const setUserInfo = useSetRecoilState(userState);
  const setErrorValue = useSetRecoilState(errorState);

  const clickCreateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locSelected) return;

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locSelected;

    const userInfo = useRecoilValue(userState);
    if (!checkLogin(userInfo)) passToLoginPage();

    if (teamName === "") {
      setErrorValue({ errorStr: "팀 이름을 입력해 주세요", timeOut: 1000 });
      return;
    }

    const gid = await createTeam({ teamName, teamInfo, location });
    if (gid === "error") {
      setErrorValue({ errorStr: "팀 생성에 실패했습니다", timeOut: 1000 });
      return;
    }
    setUserInfo((prev) => {
      return { ...prev, gid };
    });

    window.location.replace("/sub/teamSetting");
  };

  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfo setLocSelected={setLocSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
      <TeamCreateButtonContainer clickCreateButton={clickCreateButton} />
    </div>
  );
}

export default TeamCreatePage;
