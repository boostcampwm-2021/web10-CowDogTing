import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { InputLabel } from "@Core/.";
import LocationDropDown from "@Atom/LocationDropDown";
import { InfoContainer } from "@Hoc/.";
import { teamState } from "@Recoil/TeamData";

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;

export default function TeamInfoContainer({ teamNameRef, teamInfoRef, setLocSelected }: { teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; setLocSelected: (value: string) => void }) {
  const { id, info } = useRecoilValue(teamState);

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
