/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable use-isnan */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/** @jsxImportSource @emotion/react */

import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import { registerUser } from "../util";
import { registerInfo } from "../util/type";

const RegisterContainerStyle = css`
  width: 450px;
  margin: 0 auto;
  margin-top: 50px;
  select {
    height: 50px;
  }
`;

const IdContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const checkPasswordStyle = css`
  text-align: end;
  color: red;
`;

const passwordCheckContainerStyle = css`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
const InfoStyle = css`
  width: 300px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border: 2px solid #ffcfcf;
  margin-bottom: 20px;
  text-align: center;
`;

export default function RegisterPage() {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>(true);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [locSelected, setLocSelected] = useState<string>("");
  const ageRef = useRef<HTMLInputElement>(null);
  const [sexSelected, setSexSelected] = useState<string>("");
  const checkInput = ({ id, pw, location, age, sex }: registerInfo): boolean => {
    if (id === "" || pw === "" || location === "" || age === NaN || sex === "") {
      alert("모든 입력값을 제대로 입력해 주십시오.");
      return false;
    }
    return true;
  };
  const clickRegister = async () => {
    console.log(locSelected, sexSelected);
    if (!idRef.current || !pwRef.current || !locSelected || !ageRef.current || sexSelected === "") return;

    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const loc = locSelected;
    const age = ageRef.current.value;
    const sex = sexSelected;
    const check = checkInput({ id, pw, location: loc, age: Number(age), sex });
    if (!check) return;
    await registerUser({ id, pw, location: loc, age: Number(age), sex });
    location.href = "/";
  };

  return (
    <>
      <div css={RegisterContainerStyle}>
        <div>ID</div>
        <div css={IdContainerStyle}>
          <Input ref={idRef} placeholder="ID" autoComplete="off" />
          <Button type="Small"> 중복 체크 </Button>
        </div>
        <div>Password</div>
        <Input
          ref={pwRef}
          placeholder="Password"
          type="password"
          autoComplete="off"
          value={firstPassword}
          onChange={(e) => {
            setFirstPassword(e.target.value);
          }}
          onKeyUp={() => setPasswordCheck(firstPassword === secondPassword)}
        />
        <div css={passwordCheckContainerStyle}>
          <div>Password Check</div>
          {!passwordCheck && <div css={checkPasswordStyle}>패스워드가 다릅니다.</div>}
        </div>
        <Input
          placeholder="PW"
          type="password"
          autoComplete="off"
          value={secondPassword}
          onChange={(e) => {
            setSecondPassword(e.target.value);
          }}
          onKeyUp={() => setPasswordCheck(firstPassword === secondPassword)}
        />
        <div>Location</div>
        <select css={InfoStyle} onChange={(e) => setLocSelected(e.target.value)}>
          <option selected value="" disabled>
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
        <div>Age</div>
        <Input ref={ageRef} placeholder="Age" autoComplete="off" />
        <div>Sex</div>
        <div css={InfoStyle}>
          <div>
            <label htmlFor="male">남성</label>
            <input id="male" type="radio" value="남성" name="sex" onChange={(e) => setSexSelected(e.target.value)} />
          </div>
          <div>
            <label htmlFor="female">여성</label>
            <input id="female" type="radio" value="여성" name="sex" onChange={(e) => setSexSelected(e.target.value)} />
          </div>
          <div>
            <label htmlFor="female">기타</label>
            <input id="etc" type="radio" value="기타" name="sex" onChange={(e) => setSexSelected(e.target.value)} />
          </div>
        </div>
        <Button type="Long" onClick={clickRegister}>
          {" "}
          회원가입{" "}
        </Button>
      </div>
    </>
  );
}
