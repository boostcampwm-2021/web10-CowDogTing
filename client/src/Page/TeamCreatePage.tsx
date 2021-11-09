/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeamCreateButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import InputLabel from "../Molecules/InputLabel";
import LinkButton from "../Molecules/LinkButton";

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
  const leaderRef = useRef<HTMLInputElement>(null);

  const clickCreateButton: MouseEventHandler = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current || !leaderRef.current) return;

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locationRef.current.value;
    const leader = leaderRef.current.value;
    // eslint-disable-next-line no-console
    axios.post("http://localhost:4000/api/team/create", {
      name: teamName,
      description: teamInfo,
      location,
      leader,
    });
  };

  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" refProps={teamNameRef} />
        <InputLabel label="소개" refProps={teamInfoRef} />
        <InputLabel label="지역" refProps={locationRef} />
        <InputLabel label="리더 ID" refProps={leaderRef} />
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
