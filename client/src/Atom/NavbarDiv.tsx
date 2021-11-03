/* eslint-disable react/destructuring-assignment */
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const NavbarDivStyle = css`
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  align-items: center;
`;
interface DivProps {
  onClick: () => void;
  children: string;
}
export default function NavbarDiv(props: DivProps) {
  return (
    <div css={NavbarDivStyle} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
