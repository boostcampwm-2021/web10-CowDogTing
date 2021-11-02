import React from "react";
import { Global } from "@emotion/react";
import MainPage from "./Page/MainPage";
import reset from "./util/reset";
import Header from "./Organism/Header";

function App() {
  return (
    <>
      <MainPage />
      <Global styles={reset} />
      <Header />
    </>
  );
}

export default App;
