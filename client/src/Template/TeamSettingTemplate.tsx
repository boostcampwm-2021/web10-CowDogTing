/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import InputLabel from "../Molecules/InputLabel";
import TeamButtonContainer from "../Organism/TeamButtonContainer";
import TeamInfoContainer from "../Organism/TeamInfoContainer";
import ProfileList from "./ProfileList";
import InviteModal from "./InviteModal";
import { teamState, userState } from "../Recoil/Atom";
import { changeTeamInfo } from "../util/data";
import useDropDownEvent from "../Hook/useDropDownEvent";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 2vh auto auto auto;
  flex-direction: column;
  align-items: center;
`;

const InfoStyle = css`
  width: 300px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border: 2px solid #ffcfcf;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 7px;
`;
const LabelStyle = css`
  height: 20%;
  width: 90%;
`;

function TeamSettingTemplate() {
  const [teamInfoState, setTeamInfoState] = useRecoilState(teamState);
  const userInfoState = useRecoilValue(userState);

  const [locSelected, setLocSelected] = useState<string>("");
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);

  const [inviteModalState, setInviteModalState] = useState(false);
  const modalRef = useRef<HTMLInputElement>(null);
  useDropDownEvent(modalRef, () => setInviteModalState(false));

  const profileRef = useRef<HTMLDivElement[]>([]);

  const resetInput = () => {
    if (!teamNameRef.current || !teamInfoRef.current || locSelected === "") return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    setLocSelected("");
  };

  const clickUpdateButton: MouseEventHandler = async () => {
    if (!teamNameRef.current || !teamInfoRef.current || locSelected === "") return;
    if (teamInfoState.id === "") return;
    if (teamInfoState.leader !== userInfoState.id) {
      // eslint-disable-next-line no-alert
      alert("팀 리더가 아닙니다");
      return;
    }

    const teamName = teamNameRef.current.value;
    const teamInfo = teamInfoRef.current.value;
    const location = locSelected;

    const result = await changeTeamInfo({
      teamName,
      teamInfo,
      location,
    });
    setTeamInfoState((prev) => {
      return { ...prev, ...result };
    });
    resetInput();
  };

  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer>
        <InputLabel label="팀명" placeholder={teamInfoState?.id} refProps={teamNameRef} />
        <InputLabel label="소개" placeholder={teamInfoState?.info} refProps={teamInfoRef} />
        <div id="location">
          <p css={LabelStyle}>지역</p>
          <select css={InfoStyle} onChange={(e) => setLocSelected(e.target.value)}>
            <option selected value={teamInfoState?.id} disabled>
              거주지를 선택해주세요.
            </option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
            <option value="대구">대구</option>
            <option value="대전">대전</option>
            <option value="광주">광주</option>
            <option value="부산">부산</option>
            <option value="울산">울산</option>
          </select>
        </div>
      </TeamInfoContainer>
      <ProfileList datas={teamInfoState?.member} person={1} profileRef={profileRef} />
      <TeamButtonContainer>
        <div ref={modalRef}>
          <Button
            type="Medium"
            onClick={() => {
              setInviteModalState((prev) => !prev);
            }}
          >
            초대하기
          </Button>
          {inviteModalState && <InviteModal />}
        </div>
        <Button type="Medium" onClick={clickUpdateButton}>
          수정하기
        </Button>
      </TeamButtonContainer>
    </div>
  );
}

export default TeamSettingTemplate;
