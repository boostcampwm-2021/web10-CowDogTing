import React from "react";
import { Global } from "@emotion/react";
import { Route, Switch } from "react-router";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import RegisterPage from "./Page/RegisterPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/login" component={LogInPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
