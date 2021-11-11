/* eslint-disable spaced-comment */
/* eslint-disable no-console */
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
// import { joinChatRoomState, requestState, userState } from "./Recoil/Atom";
import { joinChatRoomState, requestState, userState } from "./Recoil/Atom";

function App() {
  const userUrl = `${process.env.REACT_APP_GET_USER_INFO_API_URL}`;
  const requestUrl = `${process.env.REACT_APP_GET_REQUEST_API_URL}`;
  const joinChatUrl = `${process.env.REACT_APP_GET_JOIN_CHAT_INFO_API_URL}`;
  const userInfo = useRecoilValue(fetchGet({ url: userUrl, query: "" }));
  const requestInfo = useRecoilValue(fetchGet({ url: requestUrl, query: "" }));
  const joinChatInfo = useRecoilValue(fetchGet({ url: joinChatUrl, query: "" }));

  const setUserInfo = useSetRecoilState(userState);
  const setRequestInfo = useSetRecoilState(requestState);
  const setJoinChatInfo = useSetRecoilState(joinChatRoomState);

  const getInitData = async () => {
    setUserInfo(userInfo);
    setRequestInfo(requestInfo);
    setJoinChatInfo(joinChatInfo);
  };

  useEffect(() => {
    if (userInfo.uid === "") return;
    getInitData();
  }, [userInfo, requestInfo, joinChatInfo]);

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
