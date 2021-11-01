import { css } from "@emotion/react";
import { useState } from "react";
import Menu from "../Atom/Menu";
import DropDown from "../Molecules/DropDown";

const HeaderStyle = css``;

export default function Header() {
  const [MenuOpen, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu((isOpen) => !isOpen);
  };
  return (
    <div css={HeaderStyle}>
      <div>
        <Menu onClick={() => ToggleMenu()} />
        <DropDown type="Menu" className={MenuOpen ? "show" : "hide"} />
      </div>
    </div>
  );
}
