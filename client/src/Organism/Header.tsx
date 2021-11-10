/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainHeaderLogo from "../Atom/MainHeaderLogo";
import Menu from "../Atom/Menu";
import UserIcon from "../Atom/UserIcon";
import useDropDownEvent from "../Hook/useDropDownEvent";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useDropDownEvent(menuRef, () => {
    setMenuOpen(false);
    setMeetingOpen(false);
  });
  useDropDownEvent(userRef, () => setUserOpen(false));

  const ToggleMenuModal = () => {
    setMenuOpen((isOpen) => !isOpen);
    setMeetingOpen(false);
  };
  const ToggleMeetingModal = () => {
    setMeetingOpen((isOpen) => !isOpen);
  };
  const ToggleUserModal = () => {
    setUserOpen((isOpen) => !isOpen);
  };

  return (
    <div css={HeaderStyle} id="header">
      <div ref={menuRef}>
        <Menu onClick={() => ToggleMenuModal()} />
        <DropDown type="Menu" className={menuOpen ? "show" : "hide"} onClick={() => ToggleMeetingModal()} />
        <DropDown type="Meeting" className={meetingOpen ? "show" : "hide"} />
      </div>
      <Link to="/main">
        <MainHeaderLogo />
      </Link>
      <div ref={userRef}>
        <UserIcon onClick={() => ToggleUserModal()} />
        <DropDown type="User" className={userOpen ? "show" : "hide"} />
      </div>
    </div>
  );
}
