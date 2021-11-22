/** @jsxImportSource @emotion/react */
import React, { RefObject } from "react";
import { css } from "@emotion/react";
import TeamInfoImageContainer from "./TeamInfoImageContainer";
import TeamInfoContainer from "./TeamInfoContianer";

const TeamInfoContainerStyle = css`
  display: flex;
  min-height: 450px;
  min-width: 640px;
  width: 55vw;
  height: 60vh;
  border: 1px solid #b0c2ff;
  align-items: center;
`;

export default function TeamInfo({ teamNameRef, teamInfoRef, setLocSelected }: { teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; setLocSelected: (value: string) => void }) {
  return (
    <div css={TeamInfoContainerStyle}>
      <TeamInfoImageContainer />
      <TeamInfoContainer setLocSelected={setLocSelected} teamNameRef={teamNameRef} teamInfoRef={teamInfoRef} />
    </div>
  );
}
