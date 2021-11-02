import { css } from "@emotion/react";
import { Input } from "../Atom/Input";

/** @jsxImportSource @emotion/react */
const MyInfoContainerStyle = css`
  width: 40vw;
  height: 80vh;
  text-align: start;
  padding-top: 30px;
  div {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 30px;
  }
`;
export default function MyInfoContainer() {
  return (
    <div css={MyInfoContainerStyle}>
      <span>내 프로필</span>
      <div>
        <span>이름</span>
        <Input placeholder="ID" autoComplete="off" />
        <span>나이</span>
        <Input placeholder="age" autoComplete="off" />
        <span>주소</span>
        <Input placeholder="address" autoComplete="off" />
        <span>이메일</span>
        <Input placeholder="e-mail" autoComplete="off" />
        <span>소개</span>
        <Input placeholder="소개" autoComplete="off" />
      </div>
    </div>
  );
}
