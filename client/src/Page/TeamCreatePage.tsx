/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import TeamCreateButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import InputLabel from "../Molecules/InputLabel";
import { Button } from "../Atom/Button";
import { createTeam } from "../util/data";
import { userState } from "../Recoil/Atom";

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
  const locationRef = useRef<HTMLInputElement>(null);
  const setUserInfo = useSetRecoilState(userState);

  const clickCreateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current) return;

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locationRef.current.value;

    const gid = await createTeam({ teamName, teamInfo, location });
    setUserInfo((prev) => {
      return { ...prev, gid };
    });

    window.location.replace("/sub/teamSetting");
  };

  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" refProps={teamNameRef} />
        <InputLabel label="소개" refProps={teamInfoRef} />
        <InputLabel label="지역" refProps={locationRef} />
      </TeamInfoContainer>
      <TeamCreateButtonContainer>
        <Link to="/sub/teamSetting">
          <Button type="Medium" onClick={clickCreateButton}>
            생성
          </Button>
        </Link>
        <Link to="/sub/teamSetting">
          <Button type="Medium">삭제</Button>
        </Link>
      </TeamCreateButtonContainer>
    </div>
  );
}

export default TeamCreatePage;
