/** @jsxImportSource @emotion/react */
import React from "react";
import meetingImage from "../../assets/meetingImage.png";
import { ImageDiv } from "@Atom/.";
import { MainBodyLeftButtonContainer } from "@Molecules/.";

export const MainBodyLeft = () => {
  return (
    <ImageDiv type="big" image={meetingImage}>
      <MainBodyLeftButtonContainer />
    </ImageDiv>
  );
};
