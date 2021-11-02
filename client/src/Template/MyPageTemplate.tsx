/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Header from "../Organism/Header";

const MyPageBodyStyle = css`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default function MyPageTemplate() {
  return (
    <div css={MyPageBodyStyle}>
      <Header />
    </div>
  );
}
