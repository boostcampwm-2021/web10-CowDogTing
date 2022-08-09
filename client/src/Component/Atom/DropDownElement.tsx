import { MouseEventHandler } from "react";
import { LinkButton } from "@Core/LinkButton";
import { logOutUser } from "@Util/data";
import { menuType } from "@Util/type";
import { useMovePage } from "@Hook/useMovePage";

type props = { menu: menuType; onClick: MouseEventHandler<HTMLButtonElement> | undefined };

export const DropDownElement: React.FC<props> = ({ menu, onClick }) => {
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
