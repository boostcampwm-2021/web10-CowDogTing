/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable use-isnan */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import { checkIdValidation, registerUser } from "../util/data";
import { registerInfo } from "../util/type";
import { errorState } from "../Recoil/Atom";

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

  const [locSelected, setLocSelected] = useState<string>("");
  const [sexSelected, setSexSelected] = useState<string>("");
  const [idValidation, setIdValidation] = useState(false);

  const refArray = useRef<HTMLInputElement[]>([]);
  const setErrorValue = useSetRecoilState(errorState);

  const checkInput = ({ id, pw, location, age, sex, info }: registerInfo): boolean => {
    if (!id || !pw || !location || age === NaN || !sex || !info) {
      alert("모든 입력값을 제대로 입력해 주십시오.");
      return false;
    }
    return true;
  };
  const clickRegister = async () => {
    if (!idValidation) {
      setErrorValue({ errorStr: "아이디 중복체크가 필요합니다.", timeOut: 1000 });
      return;
    }
    if (!refArray.current[0] || !refArray.current[1] || !refArray.current[2] || !refArray.current[3] || !locSelected || !sexSelected) return;

    const id = refArray.current[0].value;
    const pw = refArray.current[1].value;
    const loc = locSelected;
    const sex = sexSelected === "남성" ? "male" : "female";
    const age = refArray.current[2].value;
    const info = refArray.current[3].value;

    if (!Number(age)) {
      setErrorValue({ errorStr: "나이는 숫자만 입력해주세요.", timeOut: 1000 });
      return;
    }

    const check = checkInput({ id, pw, location: loc, age: Number(age), sex, info });
    if (!check) {
      setErrorValue({ errorStr: "모든 입력을 확인해 주세요", timeOut: 1000 });
      return;
    }
    const result = await registerUser({ id, pw, location: loc, age: Number(age), sex, info });
    if (result === "error") {
      if (!check) {
        setErrorValue({ errorStr: "회원 가입에 실패했습니다", timeOut: 1000 });
        return;
      }
    }
    window.location.href = "/";
  };

  const handleIdValidation = async () => {
    const uid = refArray.current[0].value;
    const result = await checkIdValidation(uid);
    if (!result) setErrorValue({ errorStr: "중복된 아이디입니다.", timeOut: 1000 });
    setIdValidation(result);
  };

  return (
    <>
      <div css={RegisterContainerStyle}>
        <div>ID</div>
        <div css={IdContainerStyle}>
          <Input ref={(el) => (refArray.current[0] = el as HTMLInputElement)} placeholder="ID" autoComplete="off" />
          <Button type="Small" onClick={handleIdValidation}>
            {" "}
            중복 체크{" "}
          </Button>
        </div>
        <div>Password</div>
        <Input
          ref={(el) => (refArray.current[1] = el as HTMLInputElement)}
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
        <Input ref={(el) => (refArray.current[2] = el as HTMLInputElement)} placeholder="Age" autoComplete="off" />
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
        <div>Introduce</div>
        <Input ref={(el) => (refArray.current[3] = el as HTMLInputElement)} placeholder="Introduce" autoComplete="off" />
        <Button type="Long" onClick={clickRegister}>
          {" "}
          회원가입{" "}
        </Button>
      </div>
    </>
  );
}
