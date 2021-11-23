/** @jsxImportSource @emotion/react */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { css } from "@emotion/react";
import MyPageSideBar from "../Organism/Core/MyPageSideBar";
import MyInfo from "./MyPageMain/MyInfo";
import QuestionList from "./MyPageMain/QuestionList";
import Review from "./MyPageMain/Review";
import LikeList from "./MyPageMain/LikeList";

const MyPageBodyStyle = css`
  display: flex;
  text-align: center;
  align-items: flex-start;
  width: 80vw;
  height: 100%;
`;

export default function MyPageBodyTemplate() {
  return (
    <div css={MyPageBodyStyle} id="mypage-body">
      <MyPageSideBar />
      <Switch>
        <Route path="/sub/mypage/myinfo" component={MyInfo} />
        <Route path="/sub/mypage/question" component={QuestionList} />
        <Route path="/sub/mypage/review" component={Review} />
        <Route path="/sub/mypage/likelist" component={LikeList} />
        <Redirect path="/*" to="/sub/mypage/myinfo" />
      </Switch>
    </div>
  );
}
