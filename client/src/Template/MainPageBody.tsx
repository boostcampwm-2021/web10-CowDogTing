/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainBodyLeft from "../Organism/MainPage/MainBodyLeft";
import MainBodyRight from "../Organism/MainPage/MainBodyRight";

const mainPageBodyStyle = css`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function MainPageBody() {
  return (
    <div css={mainPageBodyStyle}>
      <MainBodyLeft />
      <MainBodyRight />
    </div>
  );
}

export default MainPageBody;
