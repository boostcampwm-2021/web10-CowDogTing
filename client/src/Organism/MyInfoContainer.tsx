/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";

const MyInfoContainerStyle = css`
  width: 350px;
  height: 80vh;
  text-align: start;
  padding-top: 20px;
  .myinfo-header {
    height: 10vh;
    align-items: center;
    span {
      font-size: 32px;
    }
    display: flex;
    justify-content: space-between;
  }
  .myinfo {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 20px;
    height: 60vh;
  }
`;
export default function MyInfoContainer() {
  return (
    <div css={MyInfoContainerStyle}>
      <div className="myinfo-header">
        <span>내 프로필</span>
        <Button type="medium">edit</Button>
      </div>
      <div className="myinfo">
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
