import React from "react";
import { MyPageTemplate } from "@Template/MyPageTemplate";
import { checkLogin, passToLoginPage } from "@Util/.";

export const MyPage: React.FC = () => {
  if (!checkLogin()) passToLoginPage();

  return <MyPageTemplate />;
};
