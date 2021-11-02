/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import InputLabel from "../Molecules/InputLabel";

const TeamCreateContainerStyle = css`
  display: flex;
  width: 100%;
  height: 70%;
  border: 1px solid #b0c2ff;
`;
const ImageContainerStyle = css`
  width: 100%;
  height: 100%;
`;

const TeamCreateInputContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

function TeamCreateContainer() {
  return (
    <div css={TeamCreateContainerStyle}>
      <div css={ImageContainerStyle}>image 입주 예정</div>
      <div css={TeamCreateInputContainerStyle}>
        <InputLabel label="팀명" />
        <InputLabel label="소개" />
        <InputLabel label="가능시간" />
        <InputLabel label="지역" />
      </div>
    </div>
  );
}

export default TeamCreateContainer;
