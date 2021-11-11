/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
// import { getTeamPeople } from "../util/dummyData";
import ProfileList from "./ProfileList";
import InviteModal from "./InviteModal";
import { teamState } from "../Recoil/Atom";
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
  const teamInfoState = useRecoilValue(teamState);
  const [inviteModalState, setInviteModalState] = useState(false);

  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const leaderRef = useRef<HTMLInputElement>(null);
  let beforeTeamName = "";

  useEffect(() => {
    if (teamNameRef.current === null) return;
    beforeTeamName = teamNameRef.current.value;
  }, [teamNameRef.current]);
  const profileRef = useRef<HTMLDivElement[]>([]);

  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current || !leaderRef.current) return;
    if (teamInfoState === null) return;
    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locationRef.current.value;
    const leader = leaderRef.current.value;

    await changeTeamInfo({
      beforeTeamName,
      teamName,
      teamInfo,
      location,
      leader,
    });
  };

  // const getTeamInfo = async () => {
  //   const data = await getTeamPeople(1);
  //   setTeamInfo(data);
  // };
  // useEffect(() => {
  //   getTeamInfo();
  // }, []);

  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder={teamInfoState?.id} refProps={teamNameRef} />
        <InputLabel label="소개" placeholder={teamInfoState?.info} refProps={teamInfoRef} />
        <InputLabel label="지역" placeholder={teamInfoState?.location} refProps={locationRef} />
        <InputLabel label="팀 리더" placeholder={teamInfoState?.leader} refProps={leaderRef} />
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
