import React from "react";
import { ChatListTemplate } from "../../Template/ChatList/ChatListTemplate";
import { checkLogin, passToLoginPage } from "../../../Util";

export const ChatListPage: React.FC = () => {
  if (!checkLogin()) passToLoginPage();
  return <ChatListTemplate />;
};
