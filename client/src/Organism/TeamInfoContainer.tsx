/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import TeamInputContainer from "./TeamInputContainer";
import { ChildrenType } from "../util/type";
import teamImage from "../assets/meetingImage.png";
import TeamInfoImageContainer from "./TeamInfoImageContainer";

const TeamInfoContainerStyle = css`
  display: flex;
  min-height: 450px;
  width: 60vw;
  height: 60vh;
  border: 1px solid #b0c2ff;
`;

function TeamInfoContainer({ children }: ChildrenType) {
  return (
    <div css={TeamInfoContainerStyle}>
      <TeamInfoImageContainer image={teamImage} />
      <TeamInputContainer>{children}</TeamInputContainer>
    </div>
  );
}

export default TeamInfoContainer;
