import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { Footer } from "@Core/.";

import { usePreload } from "@Hook/usePreload";
import { useSocketConnect } from "./Hook/useSocket";
import ErrorModal from "./Component/Template/Modal/ErrorModal";

const MainPage = React.lazy(() => import("@Page/MainPage/MainPage"));
const Page = React.lazy(() => import("@Page/Page/Page"));
const meetingImage = "Asset/meetingImage.png";

export const App: React.FC = () => {
  useSocketConnect();
  usePreload(meetingImage);

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
