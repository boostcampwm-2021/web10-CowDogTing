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
>>>>>>> 1c22814... Feat : 팀 생성 컨테이너 UI 개발[#55]

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
>>>>>>> 1c22814... Feat : 팀 생성 컨테이너 UI 개발[#55]
        <Redirect path="/*" to="/" />
      </Switch>
    </>
  );
}

export default App;
