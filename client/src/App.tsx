import React from "react";
import { Route } from "react-router";
import { Navigate, Routes } from "react-router-dom";
import { MainPage } from "@Page/.";
import { Footer } from "@Core/.";
import { useSocketConnect } from "./Hook/useSocket";
import ErrorModal from "./Component/Template/Modal/ErrorModal";
import { ChatRoom, Page } from "./Component/Page";

export const App: React.FC = () => {
  // useSocketConnect();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sub/*" element={<Page />} />
        {/* <Route path="/ChatRoom" element={<ChatRoom />} /> */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {/* <Footer />
      <ErrorModal /> */}
    </>
  );
};
