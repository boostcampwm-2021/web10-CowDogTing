/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainBodyLeft from "../Organism/MainBodyLeft";
import MainBodyRight from "../Organism/MainBodyRight";

const mainPageBodyStyle = css`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
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
