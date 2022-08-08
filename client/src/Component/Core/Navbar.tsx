import { useRef, useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon, Input } from "@Atom/.";
import { DropDown } from "@Core/.";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { NavBarComponent } from "./NavBarComponent";

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

const list = [
  { id: "Location", name: "지역" },
  { id: "Age", name: "나이" },
  { id: "Sex", name: "성별" },
];

export const Navbar = ({ setCategory }: { setCategory: Function }) => {
  const [dropDownToggle, setDropDownToggle] = useState("");

  const navBarRef = useRef<HTMLDivElement[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDownClick: React.MouseEventHandler = (event: React.MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;

    navBarRef.current.forEach((ref, index) => {
      if (ref.contains(target)) {
        const { id } = list[index];
        setDropDownToggle((prev) => (prev === id ? "" : id));
      }
    });
  };

  useModalCloseEvent(dropDownRef, navBarRef, () => setDropDownToggle(""));

  const handleSetCategory = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const category = target.dataset.id;
    setCategory(category);
  };

  return (
    <>
      <div css={NavbarStyle} onClick={(event) => handleDropDownClick(event)}>
        <div css={NavbarContainerStyle}>
          <NavBarComponent navBarRef={navBarRef} />
          <div className="navbar-item">
            <Input />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div css={DropDownContainerStyle} ref={dropDownRef}>
        {dropDownToggle && <DropDown type={dropDownToggle} className="show" onClick={handleSetCategory} />}
      </div>
    </>
  );
};
