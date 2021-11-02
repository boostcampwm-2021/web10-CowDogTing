/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainHeaderLogo from "../Atom/MainHeaderLogo";

const mainHeaderCenterStyle = css`
  position: relative;
  width: 210px;
  justify-content: center;
  top: 30%;
`;

function MainHeaderCenter() {
  return (
    <div css={mainHeaderCenterStyle}>
      <MainHeaderLogo />
    </div>
  );
}

export default MainHeaderCenter;
