/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { MainPageBody } from "./MainPageBody";
import MainHeader from "../Organism/MainPage/MainHeader";

const mainPageTemplateStyle = css`
  width: 100vw;
  height: 100vh;
`;

export const MainPageTemplate = () => {
  return (
    <div css={mainPageTemplateStyle}>
      <MainHeader />
      <MainPageBody />
    </div>
  );
};
