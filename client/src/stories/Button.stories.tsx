/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../Atom/Button";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <RecoilRoot>
    <BrowserRouter>
      <>
        <Button {...args} />
      </>
    </BrowserRouter>
  </RecoilRoot>
);

export const normal = Template.bind({});
normal.args = {};

export const Long = Template.bind({});
Long.args = {
  type: "Long",
  color: "#ffcfcf",
};
