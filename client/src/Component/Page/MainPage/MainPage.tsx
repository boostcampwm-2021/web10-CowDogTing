import React from "react";
import { css } from "@emotion/react";
import { MainHeader, MainPageBody } from "@Organism/.";

export const MainPage: React.FC = () => {
  return (
    <div css={mainPageTemplateStyle}>
      <div css={mainHeaderStyle}>
        <MainHeader />
      </div>
      <div css={mainPageBodyStyle}>
        <MainPageBody />
      </div>
    </div>
  );
};

export default MainPage;

const mainPageTemplateStyle = css`
  width: 100vw;
  height: 100vh;
`;

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

const mainPageBodyStyle = css`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
