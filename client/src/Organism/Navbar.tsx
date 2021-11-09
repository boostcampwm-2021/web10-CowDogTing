/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { Input } from "../Atom/Input";
import NavbarDiv from "../Atom/NavbarDiv";
import DropDown from "../Molecules/DropDown";
import SearchIcon from "../Atom/SearchIcon";
import useModalEvent from "../Hook/useModalEvent";

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
  const [locationDropdown, setLocationOpen] = useState(false);
  const [ageDropdwon, setAgeOpen] = useState(false);
  const [sexDropdwon, setSexOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const sexRef = useRef<HTMLDivElement>(null);

  useModalEvent(locationRef, () => setLocationOpen(false));
  useModalEvent(ageRef, () => setAgeOpen(false));
  useModalEvent(sexRef, () => setSexOpen(false));

  const TogglelocationModal = () => {
    // setAgeOpen(false);
    // setSexOpen(false);
    setLocationOpen((isOpen) => !isOpen);
  };
  const ToggleAgeModal = () => {
    // setLocationOpen(false);
    // setSexOpen(false);
    setAgeOpen((isOpen) => !isOpen);
  };
  const ToggleSexModal = () => {
    // setAgeOpen(false);
    // setLocationOpen(false);
    setSexOpen((isOpen) => !isOpen);
  };

  return (
    <div css={NavbarStyle}>
      <div className="navbar-item" data-id="location" ref={locationRef}>
        <NavbarDiv onClick={TogglelocationModal}>지역</NavbarDiv>
        <DropDown type="Location" className={locationDropdown ? "show" : "hide"} />
      </div>
      <div className="navbar-item" data-id="age" ref={ageRef}>
        <NavbarDiv onClick={ToggleAgeModal}>나이</NavbarDiv>
        <DropDown type="Age" className={ageDropdwon ? "show" : "hide"} />
      </div>
      <div className="navbar-item" data-id="sex" ref={sexRef}>
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
