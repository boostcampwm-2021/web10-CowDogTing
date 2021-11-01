import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <LogInPage />
    </>
  );
}

export default App;
