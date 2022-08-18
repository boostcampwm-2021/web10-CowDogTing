import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import reset from "@Common/reset";
import { App } from "./App";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <RecoilRoot>
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Global styles={reset} />
        <App />
      </React.Suspense>
    </Router>
  </RecoilRoot>
);
