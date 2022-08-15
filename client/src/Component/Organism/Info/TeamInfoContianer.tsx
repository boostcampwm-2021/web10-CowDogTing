import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { InputLabel } from "@Core/.";
import { LocationDropDown } from "@Atom/.";
import { InfoContainer } from "@Hoc/.";
import { teamStateSelector } from "@Recoil/TeamData";

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;

type props = { locSelected: string; teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; handleLocationSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void };

export const TeamInfoContainer = ({ teamNameRef, teamInfoRef, locSelected, handleLocationSelected }: props) => {
  const { id, info } = useRecoilValue(teamStateSelector);
  return (
    <InfoContainer>
      <InputLabel label="팀명" placeholder={id} refProps={teamNameRef} />
      <InputLabel label="소개" placeholder={info} refProps={teamInfoRef} />
      <div id="location">
        <p css={LabelStyle}>지역</p>
        <LocationDropDown locSelected={locSelected} handleLocationSelected={handleLocationSelected} id={id} />
      </div>
    </InfoContainer>
  );
};
