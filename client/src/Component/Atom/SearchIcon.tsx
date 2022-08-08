/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import searchIcon from "../assets/search.png";

const searchIconStyle = css`
  position: relative;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  cursor: pointer;
`;
export default function SearchIcon() {
  return <img alt="search Icon" src={searchIcon} css={searchIconStyle} />;
}
