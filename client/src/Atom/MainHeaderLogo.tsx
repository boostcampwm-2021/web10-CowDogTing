/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import logo from "../assets/Logo.svg";

const mainHeaderLogoStyle = css`
  position: relative;
  left: 40%;
  top: 70%;
`;

function MainHeaderLogo() {
  return <img alt="mainLogo" src={logo} css={mainHeaderLogoStyle} />;
}

export default MainHeaderLogo;
