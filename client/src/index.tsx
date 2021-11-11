import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
