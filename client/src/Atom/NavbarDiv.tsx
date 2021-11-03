/* eslint-disable react/destructuring-assignment */
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const NavbarDivStyle = css`
  cursor: pointer;
  width: 15vw;
  border-right: 1px solid black;
  line-height: 80px;
  text-align: center;
  align-items: center;
`;
interface DivProps {
  onClick: () => void;
  children: string;
}
export default function NavbarDiv(props: DivProps) {
  return (
    <div css={NavbarDivStyle} onClick={props.onClick} className="navbar-div">
      {props.children}
    </div>
  );
}
