import { Routes, Route, Navigate } from "react-router-dom";
import { CowDogPage, TeamSettingPage, MyPage, ChatListPage, RequestPage, ChatRoom } from "..";

export const UserPage = () => {
  return (
    <Routes>
      <Route path="/CowDogPage" element={<CowDogPage />} />
      <Route path="/teamSetting" element={<TeamSettingPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/chatList" element={<ChatListPage />} />
      <Route path="/Request" element={<RequestPage />} />
      <Route path="/ChatRoom" element={<ChatRoom />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
