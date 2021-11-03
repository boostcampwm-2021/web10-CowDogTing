import { css } from "@emotion/react";
import React, { useState } from "react";
import UserIcon from "../Atom/UserIcon";
import DropDown from "./DropDown";
/** @jsxImportSource @emotion/react */
function MainHeaderRightSide() {
  const [UserOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };
  return (
    <div
      css={css`
        margin-top: 50px;
        margin-right: 80px;
      `}
    >
      <UserIcon onClick={() => ToggleUserModal()} />
      <DropDown type="User" className={UserOpen ? "show" : "hide"} />
    </div>
  );
}

export default MainHeaderRightSide;
