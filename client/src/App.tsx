import { Route } from "react-router";
import { Navigate, Routes } from "react-router-dom";
import { Footer } from "@Core/.";
import ErrorModal from "./Component/Template/Modal/ErrorModal";
import { MainPage } from "@Page/.";
import { useSocketConnect } from "./Hook/useSocket";
import { ChatRoom, Page } from "./Component/Page";

export const App: React.FC = () => {
  useSocketConnect();
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/sub" element={<Page />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {/* <Footer />
      <ErrorModal /> */}
    </>
  );
};
