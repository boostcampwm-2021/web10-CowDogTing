/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import TeamInfoImageContainer from "./TeamInfoImageContainer";
import UserInfoContainer from "./UserInfoContainer";

const MyInfoStyle = css`
  padding-left: 50px;
  width: 60vw;
  display: flex;
  align-items: center;
`;

export default function UserInfo() {
  return (
    <div css={MyInfoStyle}>
      <UserInfoContainer />
      <TeamInfoImageContainer />
    </div>
  );
}
