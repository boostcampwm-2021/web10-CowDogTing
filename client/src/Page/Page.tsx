import React from "react";
import { Route, Switch } from "react-router";
import Header from "../Organism/Core/Header";
import ChatListPage from "./ChatListPage";
import CowDogPage from "./CowDogPage";
import LogInPage from "./LogInPage";
import MyPage from "./MyPage";
import RegisterPage from "./RegisterPage";
import RequestPage from "./RequestPage";
import TeamSettingPage from "./TeamSettingPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/sub/Login" component={LogInPage} />
        <Route path="/sub/Register" component={RegisterPage} />
        <Route path="/sub/CowDogPage" component={CowDogPage} />
        <Route path="/sub/teamSetting" component={TeamSettingPage} />
        <Route path="/sub/mypage" component={MyPage} />
        <Route path="/sub/chatList" component={ChatListPage} />
        <Route path="/sub/Request" component={RequestPage} />
      </Switch>
    </>
  );
}

export default App;
