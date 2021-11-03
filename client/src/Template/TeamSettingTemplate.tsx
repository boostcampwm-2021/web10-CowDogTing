/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import TeamSettingMemberContainer from "../Organism/TeamSettingMemberContainer";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;
function TeamSettingTemplate() {
  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder="민태홍 남친구함" />
        <InputLabel label="소개" placeholder="운동 잘하는 사람" />
        <InputLabel label="가능시간" placeholder="2023/02/11" />
        <InputLabel label="지역" placeholder="경기/수원" />
      </TeamInfoContainer>
      <TeamSettingMemberContainer />
      <TeamButtonContainer>
        <Button type="Medium">초대하기</Button>
        <Button type="Medium">수정하기</Button>
      </TeamButtonContainer>
    </div>
  );
}

export default TeamSettingTemplate;
