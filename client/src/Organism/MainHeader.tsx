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
