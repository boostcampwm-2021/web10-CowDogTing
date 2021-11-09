/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import UserIcon from "../Atom/UserIcon";
import useModalEvent from "../Hook/useModalEvent";
import DropDown from "./DropDown";

function MainHeaderRightSide() {
  const [userOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };

  const userRef = useRef<HTMLDivElement>(null);

  useModalEvent(userRef, () => setUser(false));
  return (
    <div
      css={css`
        margin-top: 50px;
        margin-right: 80px;
      `}
      ref={userRef}
    >
      <UserIcon onClick={() => ToggleUserModal()} />
      <DropDown type="User" className={userOpen ? "show" : "hide"} />
    </div>
  );
}

export default MainHeaderRightSide;
