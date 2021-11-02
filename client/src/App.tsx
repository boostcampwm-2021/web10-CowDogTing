import React from "react";
import { Global } from "@emotion/react";
import { Redirect, Route, Switch } from "react-router";
import reset from "./util/reset";
import LogInPage from "./Page/LogInPage";
import RegisterPage from "./Page/RegisterPage";
import MainPage from "./Page/MainPage";
<<<<<<< HEAD
import MyPage from "./Page/MyPage";
=======
import TeamCreatePage from "./Page/TeamCreatePage";
<<<<<<< HEAD
>>>>>>> 1c22814... Feat : 팀 생성 컨테이너 UI 개발[#55]
=======
import TeamSettingPage from "./Page/TeamSettingPage";
>>>>>>> f4efd67... Feat : 팀 설정 페이지 - 팀 없음 UI 구현[#48]

function App() {
  return (
    <>
      <Global styles={reset} />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LogInPage} exact />
        <Route path="/register" component={RegisterPage} />
<<<<<<< HEAD
        <Route path="/mypage" component={MyPage} />
=======
        <Route path="/teamCreate" component={TeamCreatePage} />
<<<<<<< HEAD
>>>>>>> 1c22814... Feat : 팀 생성 컨테이너 UI 개발[#55]
=======
        <Route path="/teamSetting" component={TeamSettingPage} />
>>>>>>> f4efd67... Feat : 팀 설정 페이지 - 팀 없음 UI 구현[#48]
        <Redirect path="/*" to="/" />
      </Switch>
    </>
  );
}

export default App;
