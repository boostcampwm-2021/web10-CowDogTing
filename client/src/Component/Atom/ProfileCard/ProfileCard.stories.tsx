import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ProfileInfo } from "@Atom/ProfileInfo";
// import { ChatProfileInfoContainer } from "@Molecules/.";
// import { ProfileImageContainer } from "../../Hoc";
import { ProfileCard } from "./ProfileCard";

export default {
  component: ProfileCard,
  title: "ProfileCard",
} as ComponentMeta<typeof ProfileCard>;

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
export const ManUserProfileCard: React.VFC = () => (
  <ProfileCard type="male">
    <ProfileInfo data={manData} />
  </ProfileCard>
);
export const WomanUserProfileCard: React.VFC = () => (
  <ProfileCard type="female">
    <ProfileInfo data={womanData} />
  </ProfileCard>
);

// export const ChatProfile: React.VFC = () => (
//   <ProfileCard type="team">
//     {/* <ProfileImageContainer /> */}
//     <ChatProfileInfoContainer lastChat="hihi" from="jinPro" />
//   </ProfileCard>
// );
