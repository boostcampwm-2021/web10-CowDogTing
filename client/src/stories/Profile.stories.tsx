/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserContainer from "../Container/UserContainer";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Profilelist",
  component: UserContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof UserContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserContainer> = (args) => <UserContainer {...args} />;
const dummydata = { age: 25, id: "hansol", image: null, info: "안녕하세요 ", location: "대구", sex: "male" };
const ref = useRef<HTMLDivElement[]>([]);
export const profile = Template.bind({});
profile.args = { data: dummydata, profileRef: ref, idx: 1, sex: "male" };
