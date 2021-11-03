import { css } from "@emotion/react";
import { useState } from "react";
import NavbarDiv from "../Atom/NavbarDiv";
/** @jsxImportSource @emotion/react */
const NavbarStyle = css`
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid black;
`;
export default function Navbar() {
  return (
    <div css={NavbarStyle}>
      <NavbarDiv onClick={}>ㅎㅇㅎㅇ</NavbarDiv>
    </div>
  );
}
