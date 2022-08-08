import React from "react";
import { Route, Routes } from "react-router";
import { Header } from "@Core/.";
import { ChatListPage, CowDogPage, LogInPage, MyPage, RegisterPage, RequestPage, TeamSettingPage } from "..";

export const Page: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Login" element={<LogInPage />} />
        {/* <Route path="/sub/Register" element={<RegisterPage />} /> */}
        {/* <Route path="/sub/CowDogPage" element={<CowDogPage />} /> */}
        {/* <Route path="/sub/teamSetting" element={<TeamSettingPage />} /> */}
        {/* <Route path="/sub/mypage" element={<MyPage />} /> */}
        {/* <Route path="/sub/chatList" element={<ChatListPage />} /> */}
        {/* <Route path="/sub/Request" element={<RequestPage />} /> */}
      </Routes>
    </>
  );
};
