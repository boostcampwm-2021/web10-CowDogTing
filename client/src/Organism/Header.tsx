import { css } from "@emotion/react";
import Menu from "../Atom/Menu";
import DropDown from "../Molecules/DropDown";

const HeaderStyle = css``;

export default function Header() {
  return (
    <div css={HeaderStyle}>
      <div>
        <Menu />
        <DropDown type="Menu" />
      </div>
    </div>
  );
}
