/* eslint-disable react/destructuring-assignment */
/* eslint-disable comma-dangle */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const SideBarDIv = css`
  cursor: pointer;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  align-items: center;
`;
interface SideBarDivProps {
  menu: string;
  link: string;
}
export default function SideBarDiv(props: SideBarDivProps) {
  return (
    <Link to={props.link}>
      <div css={SideBarDIv}>{props.menu}</div>
    </Link>
  );
}
