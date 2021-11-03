/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const TeamSettingMemberContainerStyle = css`
  display: flex;
  width: 90%;
  height: 20%;
  margin: 2vh auto;
  align-items: center;
  justify-content: space-around;
`;
function TeamSettingMemberContainer() {
  return (
    <div css={TeamSettingMemberContainerStyle}>
      <div>김영진</div>
      <div>홍한솔</div>
    </div>
  );
}

export default TeamSettingMemberContainer;
