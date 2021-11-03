import React from "react";
import { Route, Switch } from "react-router";
import Header from "../Organism/Header";
import CowDogPage from "./CowDogPage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import TeamPage from "./TeamPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/sub/Login" component={LogInPage} />
        <Route path="/sub/Register" component={RegisterPage} />
        <Route path="/sub/CowDogPage" component={CowDogPage} />
        <Route path="/sub/Team" component={TeamPage} />
      </Switch>
    </>
  );
}

export default App;
