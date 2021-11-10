/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import UserIcon from "../Atom/UserIcon";
import useDropDownEvent from "../Hook/useDropDownEvent";
import { userState } from "../Recoil/Atom";
import DropDown from "./DropDown";
import LinkButton from "./LinkButton";

const MainHeaderRightContainer = css`
  margin-top: 50px;
  margin-right: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
function MainHeaderRightSide() {
  const userInfo = useRecoilValue(userState);
  const { id } = userInfo;

  const [userOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };

  const userRef = useRef<HTMLDivElement>(null);

  useDropDownEvent(userRef, () => setUser(false));
  return (
    <>
      <div css={MainHeaderRightContainer}>
        {id === "" ? (
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
