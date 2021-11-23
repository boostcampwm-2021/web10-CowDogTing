/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { DropDownType, menuType } from "../../util/type";
import LinkButton from "./LinkButton";
import { MENU_LIST } from "../../util/constant";
import { logOutUser } from "../../util/data";

const borderTop = css`
  border-top-left-radius: 27px;
  border-top-right-radius: 27px;
`;
const borderBottom = css`
  border-bottom-left-radius: 27px;
  border-bottom-right-radius: 27px;
`;

const NavStyle = css`
  div {
    &:first-of-type {
      ${borderTop}
    }

    &:last-child {
      ${borderBottom}
    }
  }
`;

const childrenStyle = css`
  &:first-of-type {
    div {
      ${borderTop}
    }
  }
  &:last-child {
    div {
      ${borderBottom}
    }
  }
`;

const BasicDropDownStyle = css`
  a {
    ${childrenStyle}
  }
`;

const UserDropDownStyle = css`
  margin-left: -200px;
  ${BasicDropDownStyle}
  .logout {
    ${borderBottom}
  }
`;

const LocationDropDownStyle = css`
  margin-left: 10vw;
  ${NavStyle}
`;
const AgeDropDownStyle = css`
  margin-left: 24vw;
  width: 15vw;
  ${NavStyle}
`;
const SexDropDownStyle = css`
  margin-left: 40vw;
  ${NavStyle}
`;
const ChatDropDownStyle = css`
  margin-top: -180px;
  margin-left: -180px;
  ${BasicDropDownStyle}
`;
const MeetingDropDownStyle = css`
  position: absolute;
  margin-left: 250px;
  margin-top: 155px;
  ${BasicDropDownStyle}
`;

const DropDownStyle = (props: { type: string; className: string }) => css`
  ${props.type === "Menu" && BasicDropDownStyle}
  ${props.type === "Meeting" && MeetingDropDownStyle}
  ${props.type === "User" && UserDropDownStyle}
  ${props.type === "Location" && LocationDropDownStyle}
  ${props.type === "Age" && AgeDropDownStyle}
  ${props.type === "Sex" && SexDropDownStyle}
  ${props.type === "Chat" && ChatDropDownStyle}
`;

const DropDownContainer = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: absolute;
  ${DropDownStyle}
`;

export default function DropDown(props: DropDownType) {
  const { type, className, onClick } = props;

  const list = MENU_LIST[type];

  const LogOut = async () => {
    const data = await logOutUser();
    if (data) {
      sessionStorage.setItem("isLogin", "false");
      window.location.replace("/main");
    } else {
      alert("실패 ㅋㅋ");
    }
  };

  const getElement = (menu: menuType) => {
    if (menu.name === "로그아웃") return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={LogOut} />;
    return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={onClick} id={menu.name} />;
  };

  return (
    <DropDownContainer type={type} className={className}>
      {list.map((menu) => getElement(menu))}
    </DropDownContainer>
  );
}
