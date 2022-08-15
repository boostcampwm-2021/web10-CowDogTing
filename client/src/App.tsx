import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { MainPage } from "@Page/.";
import { Footer } from "@Core/.";
import { useSocketConnect } from "./Hook/useSocket";
import ErrorModal from "./Component/Template/Modal/ErrorModal";
import { Page } from "./Component/Page";

export const App: React.FC = () => {
  useSocketConnect();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Page />} />
      </Routes>
      <Footer />
      <ErrorModal />
    </>
  );
};
