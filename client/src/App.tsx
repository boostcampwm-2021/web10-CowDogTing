import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import RegisterPage from "./Page/RegisterPage";
import MainPage from "./Page/MainPage";
import Header from "./Organism/Header";

function App() {
  return (
    <>
      <MainPage />
      <Global styles={reset} />
      <Header />
      <Switch>
        <Route path="/login" component={LogInPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect path="/*" to="/login" />
      </Switch>
    </>
  );
}

export default App;
