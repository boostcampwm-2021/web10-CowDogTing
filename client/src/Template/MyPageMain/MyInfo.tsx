import { css } from "@emotion/react";
import MyInfoContainer from "../../Organism/MyInfoContainer";

/** @jsxImportSource @emotion/react */
const MyInfoStyle = css`
  padding-left: 50px;
  width: 85vw;
`;
export default function MyInfo() {
  return (
    <div css={MyInfoStyle}>
      <MyInfoContainer />
    </div>
  );
}
