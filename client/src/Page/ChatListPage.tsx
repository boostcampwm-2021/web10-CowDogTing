import React from "react";
import ChatListTemplate from "../Template/ChatRoom/ChatListTemplate";
import { checkLogin, passToLoginPage } from "../util";

function ChatListPage() {
  if (!checkLogin()) passToLoginPage();

  return (
    <>
      <ChatListTemplate />
    </>
  );
}

export default ChatListPage;
