import React from "react";
import { ChildrenType } from "@Common/type";

export const LoginUserRouter = ({ children }: ChildrenType) => {
  // const [goLogin] = useMovePage("/login");
  // if (!checkLogin()) {
  //   goLogin();
  //   return null;
  // }
  return <>{children}</>;
};
