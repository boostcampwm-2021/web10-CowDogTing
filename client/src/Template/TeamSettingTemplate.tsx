/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import React, { MouseEventHandler, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
// import { getTeamPeople } from "../util/dummyData";
import ProfileList from "./ProfileList";
import InviteModal from "./InviteModal";
import { teamState, userState } from "../Recoil/Atom";
import { changeTeamInfo } from "../util";

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
  const [inviteModalState, setInviteModalState] = useState(false);

  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const profileRef = useRef<HTMLDivElement[]>([]);
  const resetInput = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current) return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    locationRef.current.value = "";
  };
  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current) return;
    if (teamInfoState.id === "") return;
    if (teamInfoState.leader !== userInfoState.id) {
      // eslint-disable-next-line no-alert
      alert("팀 리더가 아닙니다");
    }
    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locationRef.current.value;

    const result = await changeTeamInfo({
      teamName,
      teamInfo,
      location,
    });
    setTeamInfoState((prev) => {
      return { ...prev, ...result };
    });
    resetInput();
    // eslint-disable-next-line no-console
  };

  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder={teamInfoState?.id} refProps={teamNameRef} />
        <InputLabel label="소개" placeholder={teamInfoState?.info} refProps={teamInfoRef} />
        <InputLabel label="지역" placeholder={teamInfoState?.location} refProps={locationRef} />
      </TeamInfoContainer>
      <ProfileList datas={teamInfoState?.member} person={1} profileRef={profileRef} />
      <TeamButtonContainer>
        <Button
          type="Medium"
          onClick={() => {
            setInviteModalState((prev) => !prev);
          }}
        >
          초대하기
        </Button>
        <Button type="Medium" onClick={clickUpdateButton}>
          수정하기
        </Button>
      </TeamButtonContainer>
      {inviteModalState && <InviteModal teamName={teamInfoState?.id} />}
    </div>
  );
}

export default TeamSettingTemplate;
