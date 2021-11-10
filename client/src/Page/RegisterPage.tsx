/** @jsxImportSource @emotion/react */

import React, { useRef, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";

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

export default function RegisterPage() {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>(true);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const loRef = useRef(null);
  const ageRef = useRef(null);
  const sexRef = useRef(null);

  const clickRegister = async () => {
    if (idRef.current === null) return;
    if (pwRef.current === null) return;
    if (loRef.current === null) return;
    if (ageRef.current === null) return;
    if (sexRef.current === null) return;
    const id = (idRef.current as HTMLInputElement).value;
    const pw = (pwRef.current as HTMLInputElement).value;
    const location = (pwRef.current as HTMLInputElement).value;
    const age = (pwRef.current as HTMLInputElement).value;
    const sex = (pwRef.current as HTMLInputElement).value;
    const response = await axios.post(
      "http://localhost:4000/api/register",
      {
        uid: id,
        password: pw,
        location,
        age,
        sex,
      },
      { withCredentials: true }
    );
    console.log(response);
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
        <Input ref={loRef} placeholder="Location" autoComplete="off" />

        <div>Age</div>
        <Input ref={ageRef} placeholder="Age" autoComplete="off" />

        <div>Sex</div>
        <Input ref={sexRef} placeholder="Sex" autoComplete="off" />

        <Button type="Long" onClick={clickRegister}>
          {" "}
          회원가입{" "}
        </Button>
      </div>
    </>
  );
}
