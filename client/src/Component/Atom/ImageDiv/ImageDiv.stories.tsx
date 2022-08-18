import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ImageDiv, ImageDivType } from "./ImageDiv";

export default {
  component: ImageDiv,
  title: "ImageDiv",
} as ComponentMeta<typeof ImageDiv>;

const meetingImage = "Asset/meetingImage.png";

export const Primary: React.VFC<ImageDivType> = (args) => <ImageDiv {...args} />;
export const Short: React.VFC<ImageDivType> = () => <ImageDiv type="short" image={meetingImage} />;
export const Long: React.VFC<ImageDivType> = () => <ImageDiv type="long" image={meetingImage} />;
export const LeftLong: React.VFC<ImageDivType> = () => <ImageDiv type="left-long" image={meetingImage} />;
