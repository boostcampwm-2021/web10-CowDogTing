/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
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
  return (
    <div css={TeamCreatePageStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" />
        <InputLabel label="소개" />
        <InputLabel label="가능시간" />
        <InputLabel label="지역" />
      </TeamInfoContainer>
      <TeamCreateButtonContainer>
        <LinkButton url="/sub/teamSetting" type="Medium" content="생성" />
        <LinkButton url="/sub/teamSetting" type="Medium" content="삭제" />
      </TeamCreateButtonContainer>
    </div>
  );
}

export default TeamCreatePage;
