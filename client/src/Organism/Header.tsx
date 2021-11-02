/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import MainHeaderLogo from "../Atom/MainHeaderLogo";
import Menu from "../Atom/Menu";
import UserIcon from "../Atom/UserIcon";
import DropDown from "../Molecules/DropDown";

const HeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 50px;
  .hide {
    display: none;
  }
  .show {
    display: flex;
  }
`;

export default function Header() {
  const [MenuOpen, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu((isOpen) => !isOpen);
  };
  const handleModalClose = () => {};
  useEffect(() => {
    window.addEventListener("click", handleModalClose);
  }, []);
  return (
    <div css={HeaderStyle}>
      <div>
        <Menu onClick={() => ToggleMenu()} />
        <DropDown type="Menu" className={MenuOpen ? "show" : "hide"} />
      </div>
      <MainHeaderLogo />
      <UserIcon />
    </div>
  );
}
