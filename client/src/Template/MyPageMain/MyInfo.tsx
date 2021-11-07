/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import MyInfoContainer from "../../Organism/MyInfoContainer";
import TeamInfoImageContainer from "../../Organism/TeamInfoImageContainer";
import teamImage from "../../assets/meetingImage.png";

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
      <TeamInfoImageContainer image={teamImage} />
    </div>
  );
}
