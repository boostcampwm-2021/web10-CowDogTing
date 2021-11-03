/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Header from "../Organism/Header";
import MyPageBodyTemplate from "./MyPageBodyTemplate";

const MyPageStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default function MyPageTemplate() {
  return (
    <div css={MyPageStyle}>
      <Header />
      <MyPageBodyTemplate />
    </div>
  );
}
