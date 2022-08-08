/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MainHeaderLogo from "../../Atom/MainHeaderLogo";
import Menu from "../../Atom/Menu";
import UserIcon from "../../Atom/UserIcon";
import useDropDownCloseEvent from "../../../Hook/useDropDownCloseEvent";
import DropDown from "../../Molecules/Core/DropDown";
import LinkButton from "../../Molecules/Core/LinkButton";
import { checkLogin } from "../../../util";

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
  const serarchParams = new URLSearchParams(useLocation().search);
  const person = Number(serarchParams.get("person"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(menuRef, () => {
    DropDownOff();
  });
  useDropDownCloseEvent(userRef, () => setUserOpen(false));

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

  const DropDownOff = () => {
    setMenuOpen(false);
    setMeetingOpen(false);
  };

  useEffect(() => {
    if (!person) return;
    DropDownOff();
  }, [person]);

  return (
    <div css={HeaderStyle} id="header">
      <div ref={menuRef}>
        <Menu onClick={() => ToggleMenuModal()} />
        <DropDown type="Menu" className={menuOpen ? "show" : "hide"} onClick={() => ToggleMeetingModal()} />
      </div>
      <DropDown type="Meeting" className={meetingOpen ? "show" : "hide"} />
      <Link to="/main">
        <MainHeaderLogo />
      </Link>
      {!checkLogin() ? (
        <LinkButton url="/sub/login" type="Small" content="로그인" />
      ) : (
        <div ref={userRef}>
          <UserIcon onClick={() => ToggleUserModal()} />
          <DropDown type="User" className={userOpen ? "show" : "hide"} />
        </div>
      )}
    </div>
  );
}
