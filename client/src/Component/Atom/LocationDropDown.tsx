/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const InfoStyle = css`
  width: 300px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border: 2px solid #ffcfcf;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 7px;
`;

export default function LocationDropDown({ setLocSelected, id }: { setLocSelected: (value: string) => void; id: string }) {
  return (
    <select css={InfoStyle} onChange={(e) => setLocSelected(e.target.value)}>
      <option selected value={id} disabled>
        거주지를 선택해주세요.
      </option>
      <option value="서울">서울</option>
      <option value="경기">경기</option>
      <option value="인천">인천</option>
      <option value="대구">대구</option>
      <option value="대전">대전</option>
      <option value="광주">광주</option>
      <option value="부산">부산</option>
      <option value="울산">울산</option>
    </select>
  );
}
