/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import MyInfoContainer from "../../Organism/MyInfoContainer";

const MyInfoStyle = css`
  padding-left: 50px;
  width: 60vw;
`;
export default function MyInfo() {
  return (
    <div css={MyInfoStyle}>
      <MyInfoContainer />
    </div>
  );
}
