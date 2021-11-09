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
  const { onClick, children } = props;
  return (
    <div css={NavbarDivStyle} onClick={onClick} className="navbar-div">
      {children}
    </div>
  );
}
