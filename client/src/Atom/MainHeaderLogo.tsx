/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const mainHeaderLogoStyle = css`
  font-family: Romanesco;
  font-style: Regular;
  font-size: 96px;
  position: relative;
  left: 30%;
  top: 40%;
`;

function MainHeaderLogo() {
  return <div css={mainHeaderLogoStyle}>CowDogTing</div>;
}

export default MainHeaderLogo;
