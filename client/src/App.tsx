import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { Footer } from "@Core/.";
import { useSocketConnect } from "./Hook/useSocket";
import ErrorModal from "./Component/Template/Modal/ErrorModal";

const MainPage = React.lazy(() => import("@Page/MainPage/MainPage"));
const Page = React.lazy(() => import("@Page/Page/Page"));

export const App: React.FC = () => {
  useSocketConnect();
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<Page />} />
        </Routes>
      </Suspense>
      <Footer />
      <ErrorModal />
    </>
  );
};
