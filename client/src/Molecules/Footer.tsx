/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import ChatIcon from "../Atom/ChatIcon";
import DropDown from "./DropDown";

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
