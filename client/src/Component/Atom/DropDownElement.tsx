import { MouseEventHandler } from "react";
import LinkButton from "../Molecules/Core/LinkButton";
import { logOutUser } from "../../util/data";
import { menuType } from "../../util/type";

export default function DropDownElement({ menu, onClick }: { menu: menuType; onClick: MouseEventHandler<HTMLDivElement> | undefined }) {
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
