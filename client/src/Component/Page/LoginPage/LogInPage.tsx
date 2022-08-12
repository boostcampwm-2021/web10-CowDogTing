import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { postLogin } from "@Common/api";
import { errorState } from "@Recoil/Atom";
import { SocialLoginContainer, LoginButtonContainer, LoginMainInput } from "@Molecules/.";
import { useMovePage } from "@Hook/useMovePage";
import { useCheckLoginError } from "./LoginPage.hook";

const containerStyle = css`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 300px;
  margin-top: 50px;
`;

export const LogInPage: React.FC = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const social = searchParams.get("social") ?? "";

  const { idRef, pwRef, checkRefValue } = useCheckLoginError();
  const setErrorValue = useSetRecoilState(errorState);
  const [goMain] = useMovePage("/main");

  const clickLogin = async () => {
    try {
      const { id, pw } = checkRefValue();
      if (id === "" || pw === "") throw new Error();
      await postLogin({ id, pw });
      goMain();
    } catch (e) {
      setErrorValue({ errorStr: "아이디,비밀번호를 확인해 주세요", timeOut: 1000 });
    }
  };

  return (
    <div css={containerStyle}>
      <LoginMainInput idRef={idRef} pwRef={pwRef} />
      <LoginButtonContainer onClick={clickLogin} />
      {!social && <SocialLoginContainer />}
    </div>
  );
};
