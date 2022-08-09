import React from "react";
import { Route, Routes } from "react-router";
import { Header } from "@Core/.";
import { LoginUserRouter } from "@Hoc/LoginUserRouter";
import { ChatListPage, CowDogPage, LogInPage, MyPage, RegisterPage, RequestPage, TeamSettingPage } from "..";

export const Page: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Login" element={<LogInPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route
          path="/CowDogPage"
          element={
            <LoginUserRouter>
              <CowDogPage />
            </LoginUserRouter>
          }
        />
        <Route
          path="/teamSetting"
          element={
            <LoginUserRouter>
              <TeamSettingPage />
            </LoginUserRouter>
          }
        />
        <Route
          path="/mypage/*"
          element={
            <LoginUserRouter>
              <MyPage />
            </LoginUserRouter>
          }
        />
        <Route
          path="/chatList"
          element={
            <LoginUserRouter>
              <ChatListPage />
            </LoginUserRouter>
          }
        />
        {/* <Route path="/sub/Request" element={<RequestPage />} /> */}
      </Routes>
    </>
  );
};
