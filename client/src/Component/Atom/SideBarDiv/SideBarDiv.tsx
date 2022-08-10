import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export type SideBarDivProps = { menu: string; link: string };
export const SideBarDiv = ({ link, menu }: SideBarDivProps) => {
  return (
    <div css={SideBarDIv}>
      <Link to={link}>{menu}</Link>
    </div>
  );
};

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