/** @jsxImportSource @emotion/react */
import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import LocationDropDown from "../../Atom/LocationDropDown";
import InputLabel from "../../Molecules/Core/InputLabel";
import { teamState } from "../../Recoil/Atom";
import InfoContainer from "../../Container/InfoContainer";

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;

export default function TeamInfoContainer({ teamNameRef, teamInfoRef, setLocSelected }: { teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; setLocSelected: (value: string) => void }) {
  const teamInfoState = useRecoilValue(teamState);
  const { id, info } = teamInfoState;

  return (
    <InfoContainer>
      <InputLabel label="팀명" placeholder={id} refProps={teamNameRef} />
      <InputLabel label="소개" placeholder={info} refProps={teamInfoRef} />
      <div id="location">
        <p css={LabelStyle}>지역</p>
        <LocationDropDown setLocSelected={setLocSelected} id={id} />
      </div>
    </InfoContainer>
  );
}
