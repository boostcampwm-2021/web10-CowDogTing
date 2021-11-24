import React from "react";
import MyPageTemplate from "../Template/MyPageTemplate";
import { checkLogin, passToLoginPage } from "../util";

export default function MyPage() {
  if (!checkLogin()) passToLoginPage();

  return <MyPageTemplate />;
}
