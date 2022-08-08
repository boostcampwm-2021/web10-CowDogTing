import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon, Input } from "@Atom/.";
import { DropDown } from "@Core/.";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { NavBarComponent } from "../NavBarComponent";
import { useNavBarStateHook } from "./NavBar.hook";

const NavbarStyle = css`
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid black;
`;

const NavbarContainerStyle = css`
  display: flex;
  width: 80vw;
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

export const Navbar = ({ setCategory }: { setCategory: Function }) => {
  const navBarRef = useRef<HTMLDivElement[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { dropDownState, closeCallbackFunc, handleDropDownClick } = useNavBarStateHook(navBarRef);

  useModalCloseEvent(dropDownRef, navBarRef, closeCallbackFunc);

  const handleSetCategory = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const category = target.dataset.id;
    setCategory(category);
  };

  return (
    <>
      <div css={NavbarStyle} aria-hidden="true" onClick={handleDropDownClick}>
        <div css={NavbarContainerStyle}>
          <NavBarComponent navBarRef={navBarRef} />
          <div className="navbar-item">
            <Input />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div css={DropDownContainerStyle} ref={dropDownRef}>
        {dropDownState && <DropDown type={dropDownState} className="show" onClick={handleSetCategory} />}
      </div>
    </>
  );
};
