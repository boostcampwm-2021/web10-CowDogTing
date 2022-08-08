import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import { UserIcon } from "@Atom/.";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { checkLogin } from "@Util/.";
import { LinkButton, DropDown } from "@Core/.";

export const MainHeaderRightSide: React.FC = () => {
  const [userOpen, setUser] = useState(false);
  const ToggleUserModal = () => {
    setUser((isOpen) => !isOpen);
  };

  const userRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(userRef, () => setUser(false));

  if (!checkLogin())
    return (
      <div css={MainHeaderRightContainer}>
        <LinkButton url="/sub/login" type="Small" content="로그인" />
      </div>
    );
  return (
    <div css={MainHeaderRightContainer}>
      <div ref={userRef}>
        <UserIcon onClick={ToggleUserModal} />
        <DropDown type="User" className={userOpen ? "show" : "hide"} />
      </div>
    </div>
  );
};

const MainHeaderRightContainer = css`
  margin-top: 50px;
  margin-right: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
