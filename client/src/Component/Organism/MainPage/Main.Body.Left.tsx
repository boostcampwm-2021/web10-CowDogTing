import React from "react";
const meetingImage = "Asset/meetingImage.png";
import { ImageDiv } from "@Atom/.";
import { MainBodyLeftButtonContainer } from "@Molecules/.";

export const MainBodyLeft = () => {
  return (
    <ImageDiv type="big" image={meetingImage}>
      <MainBodyLeftButtonContainer />
    </ImageDiv>
  );
};
