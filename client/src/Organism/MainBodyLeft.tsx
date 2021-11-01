/** @jsxImportSource @emotion/react */
import React from "react";
import meetingImage from "../assets/meetingImage.png";
import { ImageDiv } from "../Atom/ImageDiv";
import MainBodyLeftButtonContainer from "../Molecules/MainDivContainer";

function MainBodyLeft() {
  return (
    <ImageDiv type="big" image={meetingImage}>
      <MainBodyLeftButtonContainer />
    </ImageDiv>
  );
}

export default MainBodyLeft;
