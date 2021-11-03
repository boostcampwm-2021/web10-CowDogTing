/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import Header from "../Organism/Header";
import TeamCreateButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import InputLabel from "../Molecules/InputLabel";
import { Button } from "../Atom/Button";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
  flex-direction: column;
`;

function TeamCreatePage() {
  return (
    <>
      <Header />
      <div css={TeamCreatePageStyle}>
        <TeamInfoContainer>
          <InputLabel label="팀명" />
          <InputLabel label="소개" />
          <InputLabel label="가능시간" />
          <InputLabel label="지역" />
        </TeamInfoContainer>
        <TeamCreateButtonContainer>
          <Link to="/sub/teamSetting">
            <Button type="Medium">생성</Button>
          </Link>
          <Link to="/sub/teamSetting">
            <Button type="Medium">삭제</Button>
          </Link>
        </TeamCreateButtonContainer>
      </div>
    </>
  );
}

export default TeamCreatePage;
