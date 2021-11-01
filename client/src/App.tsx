import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import MainPage from "./Page/MainPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <LogInPage />
      <MainPage />
    </>
  );
}

export default App;
