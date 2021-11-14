/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import { css } from "@emotion/react";
import { Input } from "../Atom/Input";
import NavbarDiv from "../Atom/NavbarDiv";
import SearchIcon from "../Atom/SearchIcon";
import DropDown from "../Molecules/DropDown";
import useModalCloseEvent from "../Hook/useModalCloseEvent";

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

const list = [
  { id: "Location", name: "지역" },
  { id: "Age", name: "나이" },
  { id: "Sex", name: "성별" },
];

export default function Navbar() {
  const [dropDownToggle, setDropDownToggle] = useState("");

  const navBarRef = useRef<HTMLDivElement[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDownClick: React.MouseEventHandler = (event: React.MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;

    navBarRef.current.forEach((ref, index) => {
      if (ref.contains(target)) {
        const target = list[index].id;
        setDropDownToggle((prev) => (prev === target ? "" : target));
      }
    });
  };

  useModalCloseEvent(dropDownRef, navBarRef, () => setDropDownToggle(""));

  return (
    <div css={NavbarStyle} onClick={(event) => handleDropDownClick(event)}>
      {list.map((item, idx) => {
        const { name } = item;
        return (
          <div className="navbar-item" data-id={idx} ref={(el) => ((navBarRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
            <NavbarDiv>{name}</NavbarDiv>
          </div>
        );
      })}

      <div ref={dropDownRef}>{dropDownToggle && <DropDown type={dropDownToggle} className="show" />}</div>

      <div className="navbar-item">
        <Input />
        <SearchIcon />
      </div>
    </div>
  );
}
