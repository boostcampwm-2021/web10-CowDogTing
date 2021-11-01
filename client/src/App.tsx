import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import DropDown from "./Molecules/DropDown";
import Menu from "./Atom/Menu";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Menu />
      <DropDown type="" />
    </>
  );
}

export default App;
