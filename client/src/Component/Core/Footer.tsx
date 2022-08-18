import React, { useRef } from "react";
import { css } from "@emotion/react";
import { ChatIcon } from "@Atom/.";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { checkLogin } from "@Common/util";
import { useToggleHook } from "@Hook/useToggleHook";
import { useMovePage } from "@Hook/useMovePage";
import { DropDown } from "./DropDown";

export const Footer = () => {
  const [chatDropDown, ToggleChatDropDown, handleFalseDropDown] = useToggleHook();
  const [goLogin] = useMovePage("/login");
  const handleChatIconClick = () => (checkLogin() ? ToggleChatDropDown() : goLogin());
  const chatRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(chatRef, handleFalseDropDown);

  return (
    <div css={FooterStyle} ref={chatRef}>
      <DropDown type="Chat" className={chatDropDown ? "show" : "hide"} />
      <ChatIcon onClick={handleChatIconClick} />
    </div>
  );
};

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
