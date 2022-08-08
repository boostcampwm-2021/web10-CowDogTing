/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainHeaderRightSide from "../../Molecules/MainPage/MainHeaderRightSide";
import MainHeaderCenter from "../../Molecules/MainPage/MainHeaderCenter";

const mainHeaderStyle = css`
  width: 100vw;
  height: 30vh;
  min-height: 250px;
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
      <MainHeaderRightSide />
      <MainHeaderCenter />
    </div>
  );
}

export default MainHeader;
