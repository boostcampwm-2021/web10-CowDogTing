import { useRef } from "react";

export const useCheckLoginError = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const checkRefValue = () => {
    if (!idRef.current || !pwRef.current)
      return {
        id: "",
        pw: "",
      };
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    return { id, pw };
  };
  return { idRef, pwRef, checkRefValue };
};
