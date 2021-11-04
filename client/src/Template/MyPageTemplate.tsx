/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import MyPageBodyTemplate from "./MyPageBodyTemplate";

const MyPageStyle = css`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default function MyPageTemplate() {
  return (
    <div css={MyPageStyle}>
      <MyPageBodyTemplate />
    </div>
  );
}
