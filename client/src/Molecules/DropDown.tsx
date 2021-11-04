/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable dot-notation */
/* eslint-disable comma-dangle */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Atom/Button";

type DropDownProps = {
  type?: string;
  className: string;
};
const DropDownStyle = css`
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: absolute;
  box-sizing: border-box;
  a {
    &:first-child {
      div {
        border-top-left-radius: 27px;
        border-top-right-radius: 27px;
      }
    }
    &:last-child {
      div {
        border-bottom-left-radius: 27px;
        border-bottom-right-radius: 27px;
      }
    }
  }
`;
const NavDropDownStyle = css`
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: absolute;
  box-sizing: border-box;
  div {
    &:first-child {
      border-top-left-radius: 27px;
      border-top-right-radius: 27px;
    }
    &:last-child {
      border-bottom-left-radius: 27px;
      border-bottom-right-radius: 27px;
    }
  }
`;
const ChatDropDownStyle = css`
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: -180px;
  margin-left: -180px;
  box-sizing: border-box;
  a {
    &:first-child {
      div {
        border-top-left-radius: 27px;
        border-top-right-radius: 27px;
      }
    }
    &:last-child {
      div {
        border-bottom-left-radius: 27px;
        border-bottom-right-radius: 27px;
      }
    }
  }
`;
const SearchData = {
  location: ["서울", "경기", "인천", "대구", "대전", "광주", "부산", "울산"],
  age: ["10대", "20대", "30대"],
  sex: ["남자", "여자", "기타"],
};
export default function DropDown(props: DropDownProps) {
  switch (props.type) {
    case "Menu":
      return MenuDropDown(props.className);
    case "User":
      return UserDropDown(props.className);
    case "Location":
      return NavDropDown(SearchData.location, props.className);
    case "Age":
      return NavDropDown(SearchData.age, props.className);
    case "Sex":
      return NavDropDown(SearchData.sex, props.className);
    case "Chat":
      return ChatDropDown(props.className);
    default:
      return MenuDropDown(props.className);
  }
}
const ChatDropDown = (className: string) => {
  return (
    <div css={ChatDropDownStyle} onClick={(e) => e.stopPropagation()} className={className}>
      <Link to="/sub/chatList">
        <Button type="LargeDropDown">내 채팅 목록 보기</Button>
      </Link>
      <Link to="/sub/Request">
        <Button type="LargeDropDown">채팅 요청 목록</Button>
      </Link>
    </div>
  );
};
const MenuDropDown = (className: string) => {
  const [meetingDropDown, setmeetingDropDown] = useState(false);
  const ToggleMeetingModal = () => {
    setmeetingDropDown((isOpen) => !isOpen);
  };

  return (
    <div css={DropDownStyle} onClick={(e) => e.stopPropagation()} className={className}>
      <Link to="/">
        <Button type="LargeDropDown">공지사항</Button>
      </Link>
      <Link to="/sub/CowDogPage?person=1">
        <Button type="LargeDropDown">소개팅 하러가기</Button>
      </Link>
      <div>
        <Button type="LargeDropDown" onClick={ToggleMeetingModal}>
          미팅 하러가기
        </Button>
        <MeetingDropDown className={meetingDropDown ? "show" : "hide"} />
      </div>
      <Link to="/">
        <Button type="LargeDropDown">이벤트</Button>
      </Link>
      <Link to="/">
        <Button type="LargeDropDown">문의하기</Button>
      </Link>
    </div>
  );
};
function MeetingDropDown(props: DropDownProps) {
  return (
    <div css={DropDownStyle} style={{ marginLeft: "250px", marginTop: "-100px" }} className={props.className} onClick={(e) => e.stopPropagation()}>
      <Link to="/sub/CowDogPage?person=2">
        <Button type="LargeDropDown">2:2 미팅</Button>
      </Link>
      <Link to="/sub/CowDogPage?person=3">
        <Button type="LargeDropDown">3:3 미팅</Button>
      </Link>
    </div>
  );
}
const UserDropDown = (className: string) => {
  return (
    <div css={DropDownStyle} style={{ marginLeft: "-200px" }} onClick={(e) => e.stopPropagation()} className={className}>
      <Link to="/sub/mypage/myinfo">
        <Button type="LargeDropDown">내 정보 보기</Button>
      </Link>
      <Link to="/sub/mypage/likelist">
        <Button type="LargeDropDown">내가 고른 이상형</Button>
      </Link>
      <Link to="/sub/teamCreate">
        <Button type="LargeDropDown">팀 설정하기</Button>
      </Link>
    </div>
  );
};
const NavDropDown = (DropDownList: Array<string>, className: string) => {
  return (
    <div css={NavDropDownStyle} onClick={(e) => e.stopPropagation()} className={className}>
      {DropDownList.map((el) => (
        <Button type="LargeDropDown">{el}</Button>
      ))}
    </div>
  );
};
