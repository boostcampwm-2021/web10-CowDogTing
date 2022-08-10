import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { UserIcon, Menu, MainHeaderLogo } from "@Atom/.";
import { LinkButton } from "@Core/LinkButton";
import { checkLogin } from "@Common/util";
import { useToggleHook } from "@Hook/useToggleHook";
import { DropDown } from "..";
import { useCheckHook, useHeaderRefToggle } from "./Header.hook";

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

export const Header = () => {
  const [menuOpen, handleToggleMenu, handleFalseMenu] = useToggleHook();
  const [meetingOpen, handleToggleMeet, handleFalseMeet] = useToggleHook();
  const [userOpen, handleToggleUser, handleFalseUser] = useToggleHook();

  const ToggleMenuModal = () => {
    handleToggleMenu();
    handleFalseMeet();
  };
  const DropDownOff = () => {
    handleFalseMenu();
    handleFalseMeet();
  };

  const menuRef = useHeaderRefToggle(DropDownOff);
  const userRef = useHeaderRefToggle(handleFalseUser);
  useCheckHook(DropDownOff);

  return (
    <div css={HeaderStyle} id="header">
      <div ref={menuRef}>
        <Menu onClick={ToggleMenuModal} />
        <DropDown type="Menu" className={menuOpen ? "show" : "hide"} onClick={handleToggleMeet} />
      </div>
      <DropDown type="Meeting" className={meetingOpen ? "show" : "hide"} />
      <Link to="/main">
        <MainHeaderLogo />
      </Link>
      {!checkLogin() ? (
        <LinkButton url="/login" type="Small" content="로그인" />
      ) : (
        <div ref={userRef}>
          <UserIcon onClick={handleToggleUser} />
          <DropDown type="User" className={userOpen ? "show" : "hide"} />
        </div>
      )}
    </div>
  );
};
