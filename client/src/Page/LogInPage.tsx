import React from "react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";

export default function LogInPage() {
  return (
    <>
      <h1>Sign in</h1>
      <Input placeholder="ID" autoComplete="off" />
      <Input placeholder="PW" type="password" autoComplete="off" />
      <Button type="Small">회원가입</Button>
      <Button type="Small">로그인</Button>
      <Button type="Long" color="#000000">
        Sign in with Github
      </Button>
      <Button type="Long" color="#f3e84d">
        Sign in with Kakao
      </Button>
      <Button type="Long" color="#2DB400">
        Sign in with Naver
      </Button>
    </>
  );
}
