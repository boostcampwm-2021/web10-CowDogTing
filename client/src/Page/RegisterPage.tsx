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
const sexInfoStyle = css`
  width: 300px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
export default function RegisterPage() {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>(true);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
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
    if (!idRef.current || !pwRef.current || !locationRef.current || !ageRef.current || sexSelected === "") return;

    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const loc = locationRef.current.value;
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
        <Input ref={locationRef} placeholder="Location" autoComplete="off" />
        <div>Age</div>
        <Input ref={ageRef} placeholder="Age" autoComplete="off" />
        <div>Sex</div>
        <div css={sexInfoStyle}>
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
