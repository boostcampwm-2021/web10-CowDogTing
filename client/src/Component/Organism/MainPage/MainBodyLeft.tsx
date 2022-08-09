import React from "react";
import { ImageDiv } from "@Atom/.";
import { MainBodyLeftButtonContainer } from "@Molecules/.";

const meetingImage = "Asset/meetingImage.png";

export const MainBodyLeft = () => {
  return (
    <ImageDiv type="big" image={meetingImage}>
      <MainBodyLeftButtonContainer />
    </ImageDiv>
  );
};
