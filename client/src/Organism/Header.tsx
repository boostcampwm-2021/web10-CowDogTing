/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainHeaderLogo from "../Atom/MainHeaderLogo";
import Menu from "../Atom/Menu";
import UserIcon from "../Atom/UserIcon";
import useModalEvent from "../Hook/useModalEvent";
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

  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useModalEvent(menuRef, () => setMenuOpen(false));
  useModalEvent(userRef, () => setUserOpen(false));

  const ToggleMenuModal = () => {
    setMenuOpen((isOpen) => !isOpen);
  };
  const ToggleUserModal = () => {
    setUserOpen((isOpen) => !isOpen);
  };

  // const [meetingOpen, setMeetingOpen] = useState(false);
  // const meetingRef = useRef<HTMLDivElement>(null);
  // useModalEvent(meetingRef, () => setMenuOpen(false));
  // const ToggleMeetingModal = () => {
  //   setMeetingOpen((isOpen) => !isOpen);
  // };

  return (
    <div css={HeaderStyle} id="header">
      <div ref={menuRef}>
        <Menu onClick={() => ToggleMenuModal()} />
        <DropDown type="Menu" className={menuOpen ? "show" : "hide"} />
        {/* {meetingOpen && <DropDown ref={meetingRef} type="Meeting" className={menuOpen ? "show" : "hide"} />} */}
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
