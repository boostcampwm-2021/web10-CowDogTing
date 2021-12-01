/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserContainer from "../Container/UserContainer";

export default {
  title: "Example/UserContainer",
  component: UserContainer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof UserContainer>;

const Template: ComponentStory<any> = (args) => <UserContainer {...args} />;

export const userProfile = Template.bind({});
userProfile.args = {
  sex: "남성",
  data: {
    id: "hansol",
    image: null,
    location: "경기",
    sex: "male",
    age: 24,
    info: "뭘보노 ㅅㅂ라마",
    gid: null,
    idx: 1,
  },
  profileRef: null,
  idx: 1,
};
