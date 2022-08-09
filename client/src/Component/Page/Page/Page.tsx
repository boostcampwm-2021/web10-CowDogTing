import React from "react";
import { Route, Routes } from "react-router";
import { Header } from "@Core/.";
import { LoginUserRouter } from "@Hoc/LoginUserRouter";
import { LogInPage, RegisterPage } from "..";
import { UserPage } from "./UserPage";

export const Page: React.FC = () => {
  return (
    <>
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
    </>
  );
};
