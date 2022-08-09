import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Menu } from "./Menu";

export default {
  component: Menu,
  title: "Menu",
} as ComponentMeta<typeof Menu>;

export const Primary: React.VFC = () => <Menu onClick={() => {}} />;
