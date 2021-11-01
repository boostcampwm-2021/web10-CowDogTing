import React from "react";
import { Global } from "@emotion/react";
import reset from "./util/reset";
import Header from "./Organism/Header";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Header />
    </>
  );
}

export default App;
