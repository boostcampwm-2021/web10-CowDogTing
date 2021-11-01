import React from "react";
import { Global } from "@emotion/react";
import MainPage from "./Page/MainPage";
import reset from "./util/reset";
import DropDown from "./Molecules/DropDown";
import Menu from "./Atom/Menu";

function App() {
  return (
    <>
      <MainPage />
      <Global styles={reset} />
      <Menu />
      <DropDown type="" />
    </>
  );
}

export default App;
