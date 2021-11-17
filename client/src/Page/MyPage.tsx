import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Recoil/Atom";
import MyPageTemplate from "../Template/MyPageTemplate";
import { checkLogin, passToLoginPage } from "../util";

export default function MyPage() {
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();

  return <MyPageTemplate />;
}
