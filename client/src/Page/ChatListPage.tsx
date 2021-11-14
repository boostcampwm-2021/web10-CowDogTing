import React from "react";
import ChatListTemplate from "../Template/ChatListTemplate";
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
