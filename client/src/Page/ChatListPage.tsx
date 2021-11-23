import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Recoil/Atom";
import ChatListTemplate from "../Template/ChatRoom/ChatListTemplate";
import { checkLogin, passToLoginPage } from "../util";

function ChatListPage() {
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();

  return (
    <>
      <ChatListTemplate />
    </>
  );
}

export default ChatListPage;
