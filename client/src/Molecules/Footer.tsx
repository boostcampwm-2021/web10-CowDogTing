/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import ChatIcon from "../Atom/ChatIcon";
import DropDown from "./DropDown";

const FooterStyle = css`
  z-index: 998;
  position: fixed;
  margin-left: 95%;
  margin-top: 44%;
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
`;
export default function Footer() {
  const [ChatDropDown, setChatDropDown] = useState(false);
  const ToggleChatDropDown = () => {
    setChatDropDown((isOpen) => !isOpen);
  };
  return (
    <div css={FooterStyle}>
      <DropDown type="Chat" className={ChatDropDown ? "show" : "hide"} />
      <ChatIcon onClick={ToggleChatDropDown} />
    </div>
  );
}
