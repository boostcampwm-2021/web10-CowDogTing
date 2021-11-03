import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import MainPage from "./Page/MainPage";
import MyPage from "./Page/MyPage";
import Page from "./Page/Page";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/sub" component={Page} />
        <Route path="/mypage" component={MyPage} />
        <Redirect path="*" to="/main" />
      </Switch>
    </>
  );
}

export default App;
