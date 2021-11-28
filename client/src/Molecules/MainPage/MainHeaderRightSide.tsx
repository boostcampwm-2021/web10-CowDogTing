/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import UserIcon from "../../Atom/UserIcon";
import useDropDownCloseEvent from "../../Hook/useDropDownCloseEvent";
import { checkLogin } from "../../util";
// import { logOutUser } from "../../util/data";
import DropDown from "../Core/DropDown";
import LinkButton from "../Core/LinkButton";

const MainHeaderRightContainer = css`
  margin-top: 50px;
  margin-right: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
function MainHeaderRightSide() {
  const [userOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };

  const userRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(userRef, () => setUser(false));
  return (
    <>
      <div css={MainHeaderRightContainer}>
        {!checkLogin() ? (
          <LinkButton url="/sub/login" type="Small" content="로그인" />
        ) : (
          <div ref={userRef}>
            <UserIcon onClick={() => ToggleUserModal()} />
            <DropDown type="User" className={userOpen ? "show" : "hide"} />
          </div>
        )}
      </div>
    </>
  );
}

export default MainHeaderRightSide;
