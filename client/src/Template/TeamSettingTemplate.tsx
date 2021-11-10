/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "../Atom/Button";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import TeamSettingMemberContainer from "../Organism/TeamSettingMemberContainer";
import { getTeamPeople } from "../util/dummyData";
import { PersonInfoType, TeamInfoType } from "../util/type";
import InviteModal from "./InviteModal";

const ProfileStyle = css`
  margin: 30px 0px;
`;
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
  const [inviteModalState, setInviteModalState] = useState(false);

  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const leaderRef = useRef<HTMLInputElement>(null);

  const clickUpdateButton: MouseEventHandler = () => {
    if (!teamNameRef.current || !teamInfoRef.current || !locationRef.current || !leaderRef.current) return;
    if (teamInfo === null) return;
    const teamName = teamNameRef.current.value;
    const teamInfoInput = teamInfoRef.current.value;
    const location = locationRef.current.value;
    const leader = leaderRef.current.value;
    // eslint-disable-next-line no-console

    axios.post("http://localhost:4000/api/team/update", {
      originTeamName: "ajouUniv",
      name: teamName,
      description: teamInfoInput,
      location,
      leader,
    });
  };

  const getTeamInfo = async () => {
    const data = await getTeamPeople(1);
    setTeamInfo(data);
  };
  useEffect(() => {
    getTeamInfo();
  }, []);
  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder={teamInfo?.id} refProps={teamNameRef} />
        <InputLabel label="소개" placeholder={teamInfo?.info} refProps={teamInfoRef} />
        <InputLabel label="지역" placeholder={teamInfo?.location} refProps={locationRef} />
        <InputLabel label="팀 리더" placeholder={teamInfo?.leader} refProps={leaderRef} />
      </TeamInfoContainer>
      <TeamSettingMemberContainer>
        {teamInfo?.member?.map((data: PersonInfoType, idx) => {
          const { sex } = data;
          return (
            <div css={ProfileStyle}>
              <ProfileCard type={sex} idx={idx}>
                <ProfileInfo data={data} idx={idx} />
              </ProfileCard>
            </div>
          );
        })}
      </TeamSettingMemberContainer>
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
      {inviteModalState && <InviteModal teamName={teamInfo?.id} />}
    </div>
  );
}

export default TeamSettingTemplate;
