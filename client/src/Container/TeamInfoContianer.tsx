/** @jsxImportSource @emotion/react */
import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import LocationDropDown from "../Atom/LocationDropDown";
import InputLabel from "../Molecules/InputLabel";
import { teamState } from "../Recoil/Atom";

// const TeamInfoContainerStyle = css`
//   display: flex;
//   min-height: 450px;
//   min-width: 640px;
//   width: 60vw;
//   height: 60vh;
//   border: 1px solid #b0c2ff;
//   align-items: center;
// `;

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;

export default function TeamInfoContainer({ teamNameRef, teamInfoRef, setLocSelected }: { teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; setLocSelected: (value: string) => void }) {
  const teamInfoState = useRecoilValue(teamState);
  const { id, info } = teamInfoState;

  return (
    <>
      <InputLabel label="팀명" placeholder={id} refProps={teamNameRef} />
      <InputLabel label="소개" placeholder={info} refProps={teamInfoRef} />
      <div id="location">
        <p css={LabelStyle}>지역</p>
        <LocationDropDown setLocSelected={setLocSelected} id={id} />
      </div>
    </>
  );
}
