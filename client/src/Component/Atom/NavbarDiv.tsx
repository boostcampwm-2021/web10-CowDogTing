import { css } from "@emotion/react";

const NavbarDivStyle = css`
  cursor: pointer;
  width: 15vw;
  border-right: 1px solid black;
  line-height: 80px;
  text-align: center;
  align-items: center;
`;
interface DivProps {
  children: string;
}
export default function NavbarDiv(props: DivProps) {
  const { children } = props;
  return (
    <div css={NavbarDivStyle} className="navbar-div">
      {children}
    </div>
  );
}
