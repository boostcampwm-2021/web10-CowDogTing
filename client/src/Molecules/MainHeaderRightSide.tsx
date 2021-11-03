import React, { useState } from "react";
import UserIcon from "../Atom/UserIcon";
import DropDown from "./DropDown";

function MainHeaderRightSide() {
  const [UserOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };
  return (
    <div>
      <UserIcon onClick={() => ToggleUserModal()} />
      <DropDown type="User" className={UserOpen ? "show" : "hide"} />
    </div>
  );
}

export default MainHeaderRightSide;
