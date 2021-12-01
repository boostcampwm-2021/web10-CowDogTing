/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useSetRecoilState } from "recoil";
import ProfileModal from "../Template/Modal/ProfileModal";
import { profileModalDatas } from "../Recoil/Atom";
import { ProfileType } from "../util/type";

export default {
  title: "Example/ProfileModal",
  component: ProfileModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileModal>;

const Template: ComponentStory<any> = (args) => <PrimaryTest {...args} />;
// const Template: ComponentStory<typeof ProfileModal> = () => <ProfileModal />;

export const modal = Template.bind({});
modal.args = {
  profileDatas: [
    {
      id: "1",
      image: null,
      location: "서울",
      sex: "남자",
      age: 25,
      info: "hihi",
      gid: null,
      idx: 1,
    },
  ],
  children: <ProfileModal />,
};

function PrimaryTest({ profileDatas, children }: { profileDatas: ProfileType[]; children: JSX.Element }) {
  const setDatas = useSetRecoilState(profileModalDatas);
  setDatas(profileDatas);
  return <div>{children}</div>;
}
