/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const mainPageBodyStyle = css`
  width: 100vw;
  height: 80vh;
`;

function MainPageBody() {
  return <div css={mainPageBodyStyle} />;
}

export default MainPageBody;
