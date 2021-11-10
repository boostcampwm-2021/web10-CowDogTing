/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { DropDownType } from "../util/type";
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
`;

const NavDropDownStyle = css`
  div {
    ${navStyle}
  }
`;
const ChatDropDownStyle = css`
  margin-top: -180px;
  margin-left: -180px;
  ${BasicDropDownStyle}
`;
const MeetingDropDownStyle = css`
  position: absolute;
  margin-left: 150px;
  margin-bottom: 150px;
`;

const DropDownStyle = (props: { type: string; className: string }) => css`
  ${props.type === "Menu" && BasicDropDownStyle}
  ${props.type === "Meeting" && MeetingDropDownStyle}
  ${props.type === "User" && UserDropDownStyle}
  ${props.type === "Location" && NavDropDownStyle}
  ${props.type === "Age" && NavDropDownStyle}
  ${props.type === "Sex" && NavDropDownStyle}
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

  return (
    <DropDownContainer type={type} className={className}>
      {list.map((menu) => (menu.name === "미팅 하러가기" ? <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={onClick} /> : <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} />))}
    </DropDownContainer>
  );
}
