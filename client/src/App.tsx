import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import Menu from "./Atom/Menu";
import MenuDropDown from "./Molecules/MenuDropDown";

function App() {
  return (
    <>
      <Global styles={reset} />
      <LogInPage />
      <Menu />
      <MenuDropDown />
    </>
  );
}

export default App;
