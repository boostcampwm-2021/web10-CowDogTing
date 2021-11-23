/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainPageBody from "./MainPageBody";
import MainHeader from "../Organism/MainPage/MainHeader";

const mainPageTemplateStyle = css`
  width: 100vw;
  height: 100vh;
`;

function MainPageTemplate() {
  return (
    <div css={mainPageTemplateStyle}>
      <MainHeader />
      <MainPageBody />
    </div>
  );
}

export default MainPageTemplate;
