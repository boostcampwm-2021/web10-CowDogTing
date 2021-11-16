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
`;

const NavbarContainerStyle = css`
  display: flex;
  width: 80%;
  border: 1px solid #000000;
  border-top: none;
  border-bottom: none;
  margin: 0 auto;
  min-width: 850px;
  .navbar-item {
    &:last-child {
      display: flex;
      height: 80px;
      align-items: center;
      padding: 20px;
    }
  }
`;

const DropDownContainerStyle = css`
  position: absolute;
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
    <>
      <div css={NavbarStyle} onClick={(event) => handleDropDownClick(event)}>
        <div css={NavbarContainerStyle}>
          {list.map((item, idx) => {
            const { name } = item;
            return (
              <div className="navbar-item" data-id={idx} ref={(el) => ((navBarRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
                <NavbarDiv>{name}</NavbarDiv>
              </div>
            );
          })}

          <div className="navbar-item">
            <Input />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div css={DropDownContainerStyle} ref={dropDownRef}>
        {dropDownToggle && <DropDown type={dropDownToggle} className="show" />}
      </div>
    </>
  );
}
