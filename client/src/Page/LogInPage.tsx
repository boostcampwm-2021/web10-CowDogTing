/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import { postLogin } from "../util/data";
import { errorState } from "../Recoil/Atom";

declare const window: any;

const containerStyle = css`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 300px;
  margin-top: 50px;
`;

const titleStyle = css`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLoginButtonContainerStyle = css`
  div:nth-child(1) {
    margin-top: 20px;
  }
  div:nth-child(2) {
    margin: 10px 0;
  }
`;
export default function LogInPage() {
  const searchParams = new URLSearchParams(useLocation().search);
  const code = searchParams.get("code");
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const setErrorValue = useSetRecoilState(errorState);
  const clickLogin = async () => {
    if (!idRef.current || !pwRef.current) return;
    const id = idRef.current.value;
    if (id === "") {
      setErrorValue({ errorStr: "아이디를 입력해 주세요", timeOut: 1000 });
      return;
    }
    const pw = pwRef.current.value;
    if (pw === "") {
      setErrorValue({ errorStr: "비밀번호를 입력해 주세요", timeOut: 1000 });
      return;
    }
    const response = await postLogin({ id, pw });

    if (response === "error") {
      setErrorValue({ errorStr: "아이디,비밀번호를 확인해 주세요", timeOut: 1000 });
      return;
    }

    window.location.replace("/main");
  };

  return (
    <>
      <div css={containerStyle}>
        <div css={titleStyle}>Sign in</div>
        <Input ref={idRef} placeholder="ID" autoComplete="off" />
        <Input ref={pwRef} placeholder="PW" type="password" autoComplete="off" />
        <div css={ButtonContainerStyle}>
          <Link to="/sub/Register">
            <Button type="Small">회원가입</Button>
          </Link>
          <Button type="Small" onClick={clickLogin}>
            로그인
          </Button>
        </div>
        {!code && (
          <div css={SocialLoginButtonContainerStyle}>
            <a href="http://localhost:4000/api/auth/naver">
              <Button type="Long" color="#2DB400">
                Sign in with Naver
              </Button>
            </a>
            <a href="http://localhost:4000/api/auth/github">
              <Button type="Long" color="#000000">
                Sign in with Github
              </Button>
            </a>
            <a href="http://localhost:4000/api/auth/kakao">
              <Button type="Long" color="#f3e84d">
                Sign in with Kakao
              </Button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
