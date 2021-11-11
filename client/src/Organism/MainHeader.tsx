/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainHeaderCenter from "../Molecules/MainHeaderCenter";
import MainHeaderRightSide from "../Molecules/MainHeaderRightSide";

// display: flex;
// justify-content: space-between;
const mainHeaderStyle = css`
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
      <MainHeaderRightSide />
      <MainHeaderCenter />
    </div>
  );
}

export default MainHeader;
