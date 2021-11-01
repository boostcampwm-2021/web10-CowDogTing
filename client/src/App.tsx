import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import Menu from "./Atom/Menu";

function App() {
  return (
    <>
      <Global styles={reset} />
      <LogInPage />
      <Menu />
    </>
  );
}

export default App;
