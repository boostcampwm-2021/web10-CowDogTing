import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import { LinkButton, DropDown } from "@Core/.";
import { UserIcon } from "@Atom/.";
import { checkLogin } from "@Util/.";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";

const MainHeaderRightContainer = css`
  margin-top: 50px;
  margin-right: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MainHeaderRightSide: React.FC = () => {
  const [userOpen, setUser] = useState(false);
  const ToggleUserModal = () => setUser((isOpen) => !isOpen);

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
