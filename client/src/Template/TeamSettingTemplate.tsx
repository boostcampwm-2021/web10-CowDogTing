/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import TeamInfoContainer from "../Organism/TeamInfoContainer";

const TeamSettingTemPlateStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
function TeamSettingTemplate() {
  return (
    <div css={TeamSettingTemPlateStyle}>
      <TeamInfoContainer />
    </div>
  );
}

export default TeamSettingTemplate;
