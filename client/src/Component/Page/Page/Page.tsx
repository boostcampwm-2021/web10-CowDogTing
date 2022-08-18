import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Header } from "@Core/.";
import { LoginUserRouter } from "@Hoc/LoginUserRouter";

const LogInPage = React.lazy(() => import("../LoginPage/LogInPage"));
const RegisterPage = React.lazy(() => import("../RegisterPage/RegisterPage"));
const UserPage = React.lazy(() => import("./UserPage"));

const Page: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Header />
      <Routes>
        <Route path="/Login" element={<LogInPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <LoginUserRouter>
              <UserPage />
            </LoginUserRouter>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Page;
