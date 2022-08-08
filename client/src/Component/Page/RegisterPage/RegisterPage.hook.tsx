import { useEffect, useRef, useState } from "react";

const INIT_REF_VALUE = {
  id: "",
  pw: "",
  age: "",
  info: "",
};

export const useRegisterRefsHook = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const infoRef = useRef<HTMLInputElement>(null);

  const getRefValue = () => {
    if (!idRef.current || !pwRef.current || !ageRef.current || !infoRef.current) {
      return INIT_REF_VALUE;
    }
    return {
      id: idRef.current.value,
      pw: pwRef.current.value,
      age: ageRef.current.value,
      info: infoRef.current.value,
    };
  };
  return {
    idRef,
    pwRef,
    ageRef,
    infoRef,
    getRefValue,
  };
};

export const useCheckDoublePassword = (pwRef: React.RefObject<HTMLInputElement>) => {
  const secondPwRef = useRef<HTMLInputElement>(null);
  const [passwordCheck, setPasswordCheck] = useState(true);

  const comparePassword = () => {
    if (!pwRef.current || !secondPwRef.current) return false;
    const pw = pwRef.current.value;
    const secondPw = secondPwRef.current.value;
    setPasswordCheck(pw === secondPw);
  };
  useEffect(() => {
    if (!pwRef.current || !secondPwRef.current) return;
    pwRef.current.addEventListener("blur", comparePassword);
    secondPwRef.current.addEventListener("blur", comparePassword);
    return () => {
      if (!pwRef.current || !secondPwRef.current) return;
      pwRef.current.removeEventListener("blur", comparePassword);
      secondPwRef.current.removeEventListener("blur", comparePassword);
    };
  }, [secondPwRef, pwRef]);

  return { secondPwRef, passwordCheck };
};
