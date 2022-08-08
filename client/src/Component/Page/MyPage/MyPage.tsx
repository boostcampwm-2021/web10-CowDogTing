import React from "react";
import MyPageTemplate from "../../Template/MyPageTemplate";
import { checkLogin, passToLoginPage } from "../../../util";

export const MyPage: React.FC = () => {
  if (!checkLogin()) passToLoginPage();

  return <MyPageTemplate />;
};
