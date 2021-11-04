import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import RegisterPage from "./Page/RegisterPage";
import MainPage from "./Page/MainPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/" component={MainPage} exact />

        <Route path="/login" component={LogInPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Redirect path="/*" to="/" />
      </Switch>
    </>
  );
}

export default App;
