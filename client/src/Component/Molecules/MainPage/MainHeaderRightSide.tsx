import React, { useRef } from "react";
import { css } from "@emotion/react";
import { LinkButton, DropDown } from "@Core/.";
import { UserIcon } from "@Atom/.";
import { checkLogin } from "@Common/util";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { useToggleHook } from "@Hook/useToggleHook";

const MainHeaderRightContainer = css`
  margin-top: 50px;
  margin-right: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MainHeaderRightSide: React.FC = () => {
  const [userOpen, ToggleUserModal, closeUserModal] = useToggleHook();
  const userRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(userRef, closeUserModal);

  if (!checkLogin())
    return (
      <div css={MainHeaderRightContainer}>
        <LinkButton url="/login" type="Small" content="로그인" />
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
