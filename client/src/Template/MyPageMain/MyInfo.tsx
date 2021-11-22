/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import MyInfoContainer from "../../Organism/MyInfoContainer";
import TeamInfoImageContainer from "../../Organism/TeamInfoImageContainer";

const MyInfoStyle = css`
  padding-left: 50px;
  width: 60vw;
  display: flex;
  align-items: center;
`;

export default function MyInfo() {
  return (
    <div css={MyInfoStyle}>
      <MyInfoContainer />
      <TeamInfoImageContainer />
    </div>
  );
}
