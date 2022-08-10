import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Input } from "./Input";

export default {
  component: Input,
  title: "Input",
} as ComponentMeta<typeof Input>;

export const Primary: React.VFC = (args) => <Input {...args} />;
