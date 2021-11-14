/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import ChatRoomLeft from "../Template/ChatRoomLeft";
import ChatRoomRight from "../Template/ChatRoomRight";
import { checkLogin, passToLoginPage } from "../util";
import { userState } from "../Recoil/Atom";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

export default function ChatRoom() {
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <div css={ChatRoomStyle}>
        <ChatRoomLeft />
      </div>
      <ChatRoomRight />
    </div>
  );
}
