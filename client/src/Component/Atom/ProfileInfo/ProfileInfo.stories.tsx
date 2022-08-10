import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ProfileType } from "@Util/type";
import { ProfileInfo } from "./ProfileInfo";

export default {
  component: ProfileInfo,
  title: "ProfileInfo",
} as ComponentMeta<typeof ProfileInfo>;

const manData = {
  id: "2",
  image: null,
  location: "서울",
  sex: "남성",
  age: 25,
  info: "hihi",
  gid: 1,
  idx: 2,
};
const womanData = {
  id: "2",
  image: null,
  location: "서울",
  sex: "여성",
  age: 25,
  info: "hihi",
  gid: 1,
  idx: 2,
};

export const Primary: React.VFC<ProfileType> = (args) => <ProfileInfo {...args} />;
export const ManProfileInfo: React.VFC<ProfileType> = () => <ProfileInfo {...manData} />;
export const WomanProfileInfo: React.VFC<ProfileType> = () => <ProfileInfo {...womanData} />;
