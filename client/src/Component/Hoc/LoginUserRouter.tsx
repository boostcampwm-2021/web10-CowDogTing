import React from "react";
import { checkLogin, passToLoginPage } from "@Util/.";
import { ChildrenType } from "@Util/type";

export const LoginUserRouter = ({ children }: ChildrenType) => {
  // if (!checkLogin()) {
  //   passToLoginPage();
  //   return null;
  // }
  return <>{children}</>;
};
