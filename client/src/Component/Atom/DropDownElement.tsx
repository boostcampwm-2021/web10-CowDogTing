import { MouseEventHandler } from "react";
import { LinkButton } from "@Core/LinkButton";
import { logOutUser } from "@Util/data";
import { menuType } from "@Util/type";

type props = { menu: menuType; onClick: MouseEventHandler<HTMLDivElement> | undefined };
export default function DropDownElement({ menu, onClick }: props) {
  const LogOut = async () => {
    const data = await logOutUser();
    if (data) {
      sessionStorage.setItem("isLogin", "false");
      window.location.replace("/main");
    } else {
      alert("실패 ㅋㅋ");
    }
  };

  if (menu.name === "로그아웃") return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={LogOut} />;
  return <LinkButton url={menu.link} type="LargeDropDown" content={menu.name} onClick={onClick} id={menu.name} />;
}
