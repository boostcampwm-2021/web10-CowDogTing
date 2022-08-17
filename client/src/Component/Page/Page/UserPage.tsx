import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const CowDogPage = React.lazy(() => import("../CowDogPage/CowDogPage"));
const TeamSettingPage = React.lazy(() => import("../TeamSettingPage/TeamSettingPage"));
const MyPage = React.lazy(() => import("../MyPage/MyPage"));
const ChatListPage = React.lazy(() => import("../ChatListPage/ChatListPage"));
const RequestPage = React.lazy(() => import("../RequestPage/RequestPage"));
const ChatRoom = React.lazy(() => import("../ChatListPage/ChatRoom"));

const UserPage = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/CowDogPage" element={<CowDogPage />} />
        <Route path="/teamSetting" element={<TeamSettingPage />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/chatList" element={<ChatListPage />} />
        <Route path="/Request" element={<RequestPage />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default UserPage;
