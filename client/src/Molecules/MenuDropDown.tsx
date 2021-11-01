/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const MenuStyle = css`
  width: 346px;
  border: 5px solid #ffcfcf;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  div {
    height: 85px;
    width: auto;
    line-height: 80px;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid black;
    &:last-child {
      border: none;
    }
  }
`;

export default function MenuDropDown() {
  return (
    <div css={MenuStyle}>
      <div>공지사항</div>
      <div>소개팅 하러가기</div>
      <div>미팅 하러가기</div>
      <div>이벤트</div>
      <div>문의하기</div>
    </div>
  );
}
