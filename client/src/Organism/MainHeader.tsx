/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainHeaderCenter from "../Molecules/MainHeaderCenter";
import MainHeaderRightSide from "../Molecules/MainHeaderRightSide";

const mainHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 30vh;
  .hide {
    display: none;
  }
  .show {
    display: flex;
  }
`;
function MainHeader() {
  return (
    <div css={mainHeaderStyle}>
      <div />
      <MainHeaderCenter />
      <MainHeaderRightSide />
    </div>
  );
}

export default MainHeader;
