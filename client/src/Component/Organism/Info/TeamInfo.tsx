import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { InfoImage } from "@Core/.";
import { TeamInfoContainer } from "./TeamInfoContianer";

const TeamInfoContainerStyle = css`
  display: flex;
  min-height: 450px;
  min-width: 640px;
  width: 55vw;
  height: 60vh;
  border: 1px solid #b0c2ff;
  align-items: center;
`;

type props = { locSelected: string; teamNameRef: RefObject<HTMLInputElement>; teamInfoRef: RefObject<HTMLInputElement>; handleLocationSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void };
export const TeamInfo = (props: props) => {
  return (
    <div css={TeamInfoContainerStyle}>
      <InfoImage />
      <TeamInfoContainer {...props} />
    </div>
  );
};
