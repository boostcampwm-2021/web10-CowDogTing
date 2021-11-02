import React, { useState } from "react";
import UserIcon from "../Atom/UserIcon";
// import DropDown from "./DropDown";

function MainHeaderRightSide() {
  const [UserOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };
  console.log(UserOpen);
  return (
    <>
      <UserIcon onClick={() => ToggleUserModal()} />
    </>
  );
}

export default MainHeaderRightSide;
