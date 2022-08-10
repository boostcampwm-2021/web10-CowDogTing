import React, { MouseEventHandler } from "react";
import { LinkButton } from "@Core/LinkButton";
import { logOutUser } from "@Common/api";
import { menuType } from "@Common/type";
import { useMovePage } from "@Hook/useMovePage";

export type DropDownElementProps = { menu: menuType; onClick: MouseEventHandler<HTMLButtonElement> | undefined };

export const DropDownElement: React.FC<DropDownElementProps> = ({ menu, onClick }) => {
  const [goMain] = useMovePage("/main");
  if (menu.name === "로그아웃") return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={LogOut(goMain)} />;
  return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={onClick} id={menu.name} />;
};

const LogOut = (callback: () => void) => async () => {
  try {
    const data = await logOutUser();
    if (!data) throw new Error();
    sessionStorage.setItem("isLogin", "false");
    callback();
  } catch (e) {
    throw new Error();
  }
};
