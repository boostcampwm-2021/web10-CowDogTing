import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import MainPage from "./Page/MainPage";
import MyPage from "./Page/MyPage";
import Page from "./Page/Page";
import Footer from "./Molecules/Footer";
import ChatRoom from "./Page/ChatRoom";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Footer />
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/sub" component={Page} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/ChatRoom" component={ChatRoom} />
        <Redirect path="*" to="/main" />
      </Switch>
    </>
  );
}

export default App;
