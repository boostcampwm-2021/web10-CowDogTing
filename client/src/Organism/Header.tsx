/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainHeaderLogo from "../Atom/MainHeaderLogo";
import Menu from "../Atom/Menu";
import UserIcon from "../Atom/UserIcon";
import DropDown from "../Molecules/DropDown";

const HeaderStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  margin-top: 50px;
  border-bottom: 1px solid black;
  padding: 40px;
  .hide {
    display: none;
  }
  .show {
    display: flex;
  }
`;

export default function Header() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [UserOpen, setUserOpen] = useState(false);
  const ToggleMenuModal = () => {
    setMenuOpen((isOpen) => !isOpen);
  };
  const ToggleUserModal = () => {
    setUserOpen((isOpen) => !isOpen);
  };
  const handleModalClose = () => {};
  useEffect(() => {
    window.addEventListener("click", handleModalClose);
  }, []);
  return (
    <div css={HeaderStyle} id="header">
      <div>
        <Menu onClick={() => ToggleMenuModal()} />
        <DropDown type="Menu" className={MenuOpen ? "show" : "hide"} />
      </div>
      <Link to="/main">
        <MainHeaderLogo />
      </Link>
      <div>
        <UserIcon onClick={() => ToggleUserModal()} />
        <DropDown type="User" className={UserOpen ? "show" : "hide"} />
      </div>
    </div>
  );
}
