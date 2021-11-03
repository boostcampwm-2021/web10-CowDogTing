import React from "react";
import { Route, Switch } from "react-router";
import Header from "../Organism/Header";
import CowDogPage from "./CowDogPage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import RequestPage from "./RequestPage";
import TeamCreatePage from "./TeamCreatePage";
import TeamSettingPage from "./TeamSettingPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/sub/Login" component={LogInPage} />
        <Route path="/sub/Register" component={RegisterPage} />
        <Route path="/sub/CowDogPage" component={CowDogPage} />
        <Route path="/sub/teamCreate" component={TeamCreatePage} />
        <Route path="/sub/teamSetting" component={TeamSettingPage} />
        <Route path="/sub/Request" component={RequestPage} />
      </Switch>
    </>
  );
}

export default App;
