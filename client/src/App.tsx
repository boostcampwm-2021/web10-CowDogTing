import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import MainPage from "./Page/MainPage";
import MyPage from "./Page/MyPage";
import TeamCreatePage from "./Page/TeamCreatePage";
import Page from "./Page/Page";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LogInPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/teamCreate" component={TeamCreatePage} />
        <Redirect path="/*" to="/" />
        <Route path="/main" component={MainPage} />
        <Route path="/sub" component={Page} />
        <Redirect path="*" to="/main" />
      </Switch>
    </>
  );
}

export default App;
