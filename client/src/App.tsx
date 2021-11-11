import React, { useEffect } from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import reset from "./util/reset";
import MainPage from "./Page/MainPage";
import Page from "./Page/Page";
import Footer from "./Molecules/Footer";
import ChatRoom from "./Page/ChatRoom";
import { fetchGet } from "./Recoil/Selector";
import { userState } from "./Recoil/Atom";

function App() {
  const url = "/api/core/userInfo";
  const userInfo = useRecoilValue(fetchGet({ url, query: "" }));
  const setUserInfo = useSetRecoilState(userState);
  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/sub" component={Page} />
        <Route path="/ChatRoom" component={ChatRoom} />
        <Redirect path="*" to="/main" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
