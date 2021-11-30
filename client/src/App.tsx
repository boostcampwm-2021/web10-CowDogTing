/* eslint-disable consistent-return */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import Footer from "./Molecules/Core/Footer";
import ErrorModal from "./Template/Modal/ErrorModal";
import MainPage from "./Page/MainPage";
import Page from "./Page/Page";
import ChatRoom from "./Page/ChatRoom";
import ClientSocket from "./Socket";
import { handleReceiveAcceptSocket, handleReceiveChatSocket, handleReceiveDenySocket, handleReceiveRequestSocket } from "./Socket/chatSocket";
import { ChatInfoType, RequestType, MessageType } from "./util/type";
import { CHAT_INFO_URL, JOIN_CHAT_URL, REQUEST_URL, TEAM_INFO_URL, USER_URL } from "./util/URL";
import { getFetch } from "./util/data";
import reset from "./util/reset";
import { chatsState, chatTarget, errorState, joinChatRoomState, requestState, teamState, userState } from "./Recoil/Atom";
import Project from "./Page/Project";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const setTeamInfo = useSetRecoilState(teamState);
  const setRequest = useSetRecoilState(requestState);
  const [joinChat, setJoinChat] = useRecoilState(joinChatRoomState);
  const setChat = useSetRecoilState(chatsState);
  const setChatInfo = useSetRecoilState(chatTarget);
  const setErrorValue = useSetRecoilState(errorState);

  const getInitData = async () => {
    try {
      const userData = await getFetch({ url: USER_URL, query: "" });
      const teamData = await getFetch({ url: TEAM_INFO_URL, query: "" });
      const requestData = await getFetch({ url: REQUEST_URL, query: "" });
      const joinChatData = await getFetch({ url: JOIN_CHAT_URL, query: "" });
      const chatData = await getFetch({ url: CHAT_INFO_URL, query: "" });
      if (userData) {
        sessionStorage.setItem("isLogin", "true");
      }
      setUser(userData);
      setTeamInfo(teamData);
      setRequest(requestData);
      setJoinChat(joinChatData);
      setChat(chatData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.id === "") return;
    const socket = new ClientSocket(user.id);

    const handleReceiveRequestEvent = (data: RequestType) => {
      handleReceiveRequestSocket({ setRequest, data });
      if (data.from === user.id) return;
      setErrorValue({ errorStr: "채팅 요청이 왔습니다.", timeOut: 1000 });
    };
    const handleReceiveDenyEvent = (data: { from: string; to: string }) => {
      handleReceiveDenySocket({ setRequest, data });
      if (data.from !== user.id) return;
      setErrorValue({ errorStr: `${data.to}님이 요청을 거절하셨습니다.`, timeOut: 1000 });
    };
    const handleReceiveAcceptEvent = (data: { chat: ChatInfoType; from: string; to: string }) => {
      handleReceiveAcceptSocket({ setRequest, setJoinChat, setChat, data });
      if (data.from !== user.id) return;
      setErrorValue({ errorStr: `${data.to}님이 요청을 승인하셨습니다.`, timeOut: 1000 });
    };
    const handleReceiveChatEvent = (data: { message: MessageType; chatRoomId: number }) => {
      handleReceiveChatSocket({ setJoinChat, setChat, setChatInfo, data, setErrorValue });
    };

    socket.addEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent, joinChat });
    return () => {
      socket.deleteEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent });
    };
  }, [joinChat]);

  useEffect(() => {
    if (user.id === "") {
      return;
    }
    // eslint-disable-next-line no-new
    new ClientSocket(user.id);
  }, [user]);

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/sub" component={Page} />
        <Route path="/ChatRoom" component={ChatRoom} />
        <Route path="/Project" component={Project} />
        <Redirect path="*" to="/main" />
      </Switch>
      <Footer />
      <ErrorModal />
    </>
  );
}

export default App;
