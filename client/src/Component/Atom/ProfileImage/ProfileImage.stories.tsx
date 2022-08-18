import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ProfileImage, ProfileImageType } from "./ProfileImage";

export default {
  component: ProfileImage,
  title: "ProfileImage",
} as ComponentMeta<typeof ProfileImage>;

export const Primary: React.VFC<ProfileImageType> = (args) => <ProfileImage {...args} />;
export const BigImage: React.VFC<ProfileImageType> = () => <ProfileImage type="Big" image={null} />;
export const MiniImage: React.VFC<ProfileImageType> = () => <ProfileImage type="Mini" image={null} />;
export const SmallImage: React.VFC<ProfileImageType> = () => <ProfileImage type="Small" image={null} />;
