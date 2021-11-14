/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import { css } from "@emotion/react";
import ChatIcon from "../Atom/ChatIcon";
import useDropDownCloseEvent from "../Hook/useDropDownCloseEvent";
import DropDown from "./DropDown";
import { checkLogin, passToLoginPage } from "../util";

const FooterStyle = css`
  z-index: 998;
  position: fixed;
  left: 95vw;
  top: 90vh;
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
`;
export default function Footer() {
  const [chatDropDown, setChatDropDown] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useDropDownCloseEvent(chatRef, () => setChatDropDown(false));
  const ToggleChatDropDown = () => {
    setChatDropDown((isOpen) => !isOpen);
  };

  return (
    <div css={FooterStyle} ref={chatRef}>
      <DropDown type="Chat" className={chatDropDown ? "show" : "hide"} />
      <ChatIcon onClick={() => (checkLogin() ? ToggleChatDropDown() : passToLoginPage())} />
    </div>
  );
}
