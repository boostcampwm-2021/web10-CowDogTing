/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { ProfileImage } from "../Atom/ProfileImage";
import { TeamImageContainerType } from "../util/type";

const TeamInfoImageContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function TeamInfoImageContainer({ image }: TeamImageContainerType) {
  return (
    <div css={TeamInfoImageContainerStyle}>
      <ProfileImage type="Big" image={image} />
    </div>
  );
}

export default TeamInfoImageContainer;
