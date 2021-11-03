/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import TeamSettingMemberContainer from "../Organism/TeamSettingMemberContainer";
import { getTeamPeople } from "../util/dummyData";
import { TeamInfoType } from "../util/type";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;
function TeamSettingTemplate() {
  const [teamInfo, setTeamInfo] = useState<TeamInfoType | null>(null);
  const getTeamInfo = async () => {
    const data = await getTeamPeople("태홍");
    setTeamInfo(data);
  };
  useEffect(() => {
    getTeamInfo();
  }, []);
  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder={teamInfo?.teamID} />
        <InputLabel label="소개" placeholder={teamInfo?.info} />
        <InputLabel label="가능시간" placeholder={teamInfo?.time} />
        <InputLabel label="지역" placeholder={teamInfo?.location} />
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
