/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DropDown from "../Molecules/Core/DropDown";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/DropDown",
  component: DropDown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DropDown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropDown> = (args) => (
  <RecoilRoot>
    <BrowserRouter>
      <DropDown {...args} />
    </BrowserRouter>
  </RecoilRoot>
);

export const location = Template.bind({});
location.args = { type: "Location" };
export const age = Template.bind({});
age.args = { type: "Age" };
export const sex = Template.bind({});
sex.args = { type: "Sex" };
export const chat = Template.bind({});
chat.args = { type: "Chat" };
export const menu = Template.bind({});
menu.args = { type: "Menu" };
export const meeting = Template.bind({});
meeting.args = { type: "Meeting" };
export const user = Template.bind({});
user.args = { type: "User" };
