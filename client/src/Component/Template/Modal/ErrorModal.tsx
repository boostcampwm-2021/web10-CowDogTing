import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { errorState } from "../../../Recoil/Atom";

const ErrorModalStyle = css`
  position: fixed;
  display: flex;
  left: 68%;
  top: 2%;
  width: 30vw;
  height: 10vh;
  border-radius: 10%;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  background-color: #ffcfcf;
`;
let timer: NodeJS.Timeout;

export default function ErrorModal() {
  const [errorValue, setErrorValue] = useRecoilState(errorState);
  const setModalClose = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setErrorValue({ errorStr: "", timeOut: 2000 });
    }, errorValue.timeOut);
  };
  useEffect(() => {
    setModalClose();
  }, [errorValue.errorStr]);
  return <>{errorValue.errorStr !== "" && <div css={ErrorModalStyle}>{errorValue.errorStr}</div>}</>;
}
