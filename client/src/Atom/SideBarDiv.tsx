/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const SideBarDIv = css`
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  align-items: center;
  a {
    display: block;
    width: 100%;
    height: 60px;
  }
`;
interface SideBarDivProps {
  menu: string;
  link: string;
}
export default function SideBarDiv(props: SideBarDivProps) {
  return (
    <div css={SideBarDIv}>
      <Link to={props.link}>{props.menu}</Link>
    </div>
  );
}
