import { Navigate, Route, Routes } from "react-router-dom";
import { css } from "@emotion/react";
import { MyPageSideBar } from "@Core/.";
import { MyInfo } from "./MyPageMain/MyInfo";
import { QuestionList } from "./MyPageMain/QuestionList";
import { Review } from "./MyPageMain/Review";
import { LikeList } from "./MyPageMain/LikeList";

const MyPageBodyStyle = css`
  display: flex;
  text-align: center;
  align-items: flex-start;
  width: 80vw;
  height: 100%;
`;

export const MyPageBodyTemplate = () => {
  return (
    <div css={MyPageBodyStyle} id="mypage-body">
      <MyPageSideBar />
      <Routes>
        <Route path="/sub/mypage/myinfo" element={<MyInfo />} />
        <Route path="/sub/mypage/question" element={<QuestionList />} />
        <Route path="/sub/mypage/review" element={<Review />} />
        <Route path="/sub/mypage/likelist" element={<LikeList />} />
        <Route path="/*" element={<Navigate to="/sub/mypage/myinfo" replace />} />
      </Routes>
    </div>
  );
};
