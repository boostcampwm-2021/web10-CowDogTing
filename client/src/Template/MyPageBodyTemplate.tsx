/** @jsxImportSource @emotion/react */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { css } from "@emotion/react";
import MyPageSideBar from "../Organism/MyPageSideBar";
import MyInfo from "./MyPageMain/MyInfo";
import QuestionList from "./MyPageMain/QuestionList";
import Review from "./MyPageMain/Review";
import LikeList from "./MyPageMain/LikeList";

const MyPageBodyStyle = css`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-left: 200px;
`;

export default function MyPageBodyTemplate() {
  return (
    <div css={MyPageBodyStyle}>
      <MyPageSideBar />
      <Switch>
        <Route path="/mypage/myinfo" component={MyInfo} />
        <Route path="/mypage/question" component={QuestionList} />
        <Route path="/mypage/review" component={Review} />
        <Route path="/mypage/likelist" component={LikeList} />
        <Redirect path="/*" to="/mypage/myinfo" />
      </Switch>
    </div>
  );
}
