/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MainHeader from "../Organism/MainHeader";
import MainPageBody from "./MainPageBody";

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
