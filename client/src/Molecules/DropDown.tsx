/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { DropDownType, menuType } from "../util/type";
import LinkButton from "./LinkButton";
import { MENU_LIST } from "../util/constant";

const borderTop = css`
  border-top-left-radius: 27px;
  border-top-right-radius: 27px;
`;
const borderBottom = css`
  border-bottom-left-radius: 27px;
  border-bottom-right-radius: 27px;
`;

const navStyle = css`
  &:first-child {
    ${borderTop}
  }

  &:last-child {
    ${borderBottom}
  }
`;

const childrenStyle = css`
  &:first-child {
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

const NavDropDownStyle = css`
  div {
    ${navStyle}
  }
`;
const LocationDropDownStyle = css`
  position: relative;
  left: -650px;
  top: 80px;
  ${NavDropDownStyle}
`;
const AgeDropDownStyle = css`
  position: relative;
  left: -400px;
  top: 80px;
  ${NavDropDownStyle}
`;
const SexDropDownStyle = css`
  position: relative;
  left: -250px;
  top: 80px;
  ${NavDropDownStyle}
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
  const { type, className } = props;

  const list = MENU_LIST[type];
  const ElementOnClick = ["미팅 하러가기", "로그아웃"]; // onClick 이벤트가 있는 것들을 여기 배열에 추가해주면 됨.

  const getElement = (menu: menuType) => {
    if (ElementOnClick.includes(menu.name)) return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} />;
    return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} />;
  };

  return (
    <DropDownContainer type={type} className={className}>
      {list.map((menu) => getElement(menu))}
    </DropDownContainer>
  );
}
