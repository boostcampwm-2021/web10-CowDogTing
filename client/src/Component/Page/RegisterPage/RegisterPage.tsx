import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Input, Button } from "@Atom/.";
import { checkIdValidation, registerUser } from "@Util/data";
import { ErrorType, registerInfo } from "@Util/type";
import { errorState } from "@Recoil/Atom";
import { useMovePage } from "@Hook/useMovePage";
import { useCheckDoublePassword, useRegisterRefsHook } from "./RegisterPage.hook";
import * as RegisterStyle from "./RegisterPage.style";

export const RegisterPage: React.FC = () => {
  const [locSelected, setLocSelected] = useState<string>("");
  const [sexSelected, setSexSelected] = useState<string>("");
  const [idValidation, setIdValidation] = useState(false);

  const { idRef, pwRef, ageRef, infoRef, getRefValue } = useRegisterRefsHook();
  const { secondPwRef, passwordCheck } = useCheckDoublePassword(pwRef);
  const setErrorValue = useSetRecoilState(errorState);
  const [goHome] = useMovePage("/");

  const getValues = () => ({
    ...getRefValue(),
    location: locSelected,
    sex: sexSelected === "남성" ? "male" : "female",
  });

  const clickRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bool = checkIdValidationCheck(idValidation, setErrorValue);
    if (!bool) return;

    const { id, pw, age, info, location, sex } = getValues();

    const { value, err } = checkInput({ id, pw, location, age: Number(age), sex, info });
    if (!value) {
      setErrorValue({ errorStr: err, timeOut: 1000 });
      return;
    }

    const result = await registerUser({ id, pw, location, age: Number(age), sex, info });
    if (result === "error") {
      setErrorValue({ errorStr: "회원 가입에 실패했습니다", timeOut: 1000 });
      return;
    }
    goHome();
  };

  const handleIdValidation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { id } = getRefValue();
    const result = await checkIdValidation(id);
    if (!result) setErrorValue({ errorStr: "중복된 아이디입니다.", timeOut: 1000 });
    setIdValidation(result);
  };

  return (
    <form css={RegisterStyle.RegisterContainerStyle} onSubmit={clickRegister}>
      <div>ID</div>
      <form css={RegisterStyle.IdContainerStyle}>
        <Input ref={idRef} placeholder="ID" autoComplete="off" />
        <Button size="Small" onClick={handleIdValidation}>
          중복 체크
        </Button>
      </form>

      <div>Password</div>
      <Input ref={pwRef} placeholder="Password" type="password" autoComplete="off" />

      <div css={RegisterStyle.passwordCheckContainerStyle}>
        <div>Password Check</div>
        {!passwordCheck && <div css={RegisterStyle.checkPasswordStyle}>패스워드가 다릅니다.</div>}
      </div>
      <Input ref={secondPwRef} placeholder="PW" type="password" autoComplete="off" />

      <div>Location</div>
      <select css={RegisterStyle.InfoStyle} onChange={(e) => setLocSelected(e.target.value)}>
        <option selected value="" disabled>
          거주지를 선택해주세요.
        </option>
        {regionList.map(({ value, id }) => (
          <option key={id} value={value}>
            {value}
          </option>
        ))}
      </select>

      <div>Age</div>
      <Input ref={ageRef} placeholder="Age" autoComplete="off" />

      <div>Sex</div>
      <div css={RegisterStyle.InfoStyle}>
        {sexList.map(({ id, value }) => (
          <div key={id}>
            <label htmlFor="id">
              {value}
              <input id={id} type="radio" value={value} name="sex" onChange={(e) => setSexSelected(e.target.value)} />
            </label>
          </div>
        ))}
      </div>

      <div>Introduce</div>
      <Input ref={infoRef} placeholder="Introduce" autoComplete="off" />

      <Button size="Long" type="submit">
        회원가입
      </Button>
    </form>
  );
};

const checkIdValidationCheck = (idValidation: boolean, setErrorValue: (valOrUpdater: ErrorType | ((currVal: ErrorType) => ErrorType)) => void) => {
  if (!idValidation) setErrorValue({ errorStr: "아이디 중복체크가 필요합니다.", timeOut: 1000 });
  return idValidation;
};

type checkInputFuncType = (props: registerInfo) => {
  value: boolean;
  err: string;
};
const checkInput: checkInputFuncType = ({ id, pw, location, age, sex, info }) => {
  if (!Number(age)) {
    return {
      value: false,
      err: "나이는 숫자만 입력해주세요.",
    };
  }
  if (!id || !pw || !location || Number.isNaN(age) || !sex || !info) {
    return {
      value: false,
      err: "모든 입력값을 제대로 입력해 주십시오.",
    };
  }
  return {
    value: true,
    err: "",
  };
};

const sexList = [
  {
    id: "male",
    value: "남성",
  },
  {
    id: "female",
    value: "여성",
  },
  {
    id: "etc",
    value: "기타",
  },
];
const regionList = [
  {
    value: "경기",
    id: "경기",
  },
  {
    value: "인천",
    id: "인천",
  },
  {
    value: "대구",
    id: "대구",
  },
  {
    value: "대전",
    id: "대전",
  },
  {
    value: "광주",
    id: "광주",
  },
  {
    value: "부산",
    id: "부산",
  },
  {
    value: "울산",
    id: "울산",
  },
];
