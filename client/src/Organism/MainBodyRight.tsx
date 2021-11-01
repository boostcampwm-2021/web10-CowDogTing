/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import meetingImage from "../assets/meetingImage.png";
import { ImageDiv } from "../Atom/ImageDiv";

const mainBodyRightStyle = css`
  position: relative;
  display: flex;
  width: 45%;
  height: 70%;
  flex-wrap: wrap;
  top: -3vh;
`;

function MainBodyRight() {
  return (
    <div css={mainBodyRightStyle}>
      <ImageDiv type="short" image={meetingImage} />
      <ImageDiv type="long" image={meetingImage} />
      <ImageDiv type="left-long" image={meetingImage} />
      <ImageDiv type="short" image={meetingImage} />
    </div>
  );
}

export default MainBodyRight;
