import React from "react";
import { css } from "@emotion/react";
import { MyPageBodyTemplate } from "@Template/MyPageBodyTemplate";

export const MyPage: React.FC = () => {
  return (
    <div css={MyPageStyle}>
      <MyPageBodyTemplate />
    </div>
  );
};

const MyPageStyle = css`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
