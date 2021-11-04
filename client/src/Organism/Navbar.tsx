import { css } from "@emotion/react";
import { useState } from "react";
import { Input } from "../Atom/Input";
import NavbarDiv from "../Atom/NavbarDiv";
import DropDown from "../Molecules/DropDown";
import SearchIcon from "../Atom/SearchIcon";
/** @jsxImportSource @emotion/react */
const NavbarStyle = css`
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid black;
  display: flex;
  .hide {
    display: none;
  }
  .display {
    display: flex;
  }
  .navbar-item {
    &:first-child {
      border-left: 1px solid black;
      margin-left: 210px;
    }
    &:last-child {
      display: flex;
      height: 80px;
      align-items: center;
      padding: 20px;
      border-right: 1px solid black;
    }
  }
`;
export default function Navbar() {
  const [locationDropdown, setlocationDropdown] = useState(false);
  const [ageDropdwon, setageDropdown] = useState(false);
  const [sexDropdwon, setsexDropdown] = useState(false);
  const TogglelocationModal = () => {
    setlocationDropdown((isOpen) => !isOpen);
  };
  const ToggleAgeModal = () => {
    setageDropdown((isOpen) => !isOpen);
  };
  const ToggleSexModal = () => {
    setsexDropdown((isOpen) => !isOpen);
  };

  return (
    <div css={NavbarStyle}>
      <div className="navbar-item">
        <NavbarDiv onClick={TogglelocationModal}>지역</NavbarDiv>
        <DropDown type="Location" className={locationDropdown ? "show" : "hide"} />
      </div>
      <div className="navbar-item">
        <NavbarDiv onClick={ToggleAgeModal}>나이</NavbarDiv>
        <DropDown type="Age" className={ageDropdwon ? "show" : "hide"} />
      </div>
      <div className="navbar-item">
        <NavbarDiv onClick={ToggleSexModal}>성별</NavbarDiv>
        <DropDown type="Sex" className={sexDropdwon ? "show" : "hide"} />
      </div>
      <div className="navbar-item">
        <Input />
        <SearchIcon />
      </div>
    </div>
  );
}
