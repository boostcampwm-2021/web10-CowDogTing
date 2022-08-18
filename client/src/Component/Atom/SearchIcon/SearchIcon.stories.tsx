import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SearchIcon } from "./SearchIcon";

export default {
  component: SearchIcon,
  title: "SearchIcon",
} as ComponentMeta<typeof SearchIcon>;

export const Primary: React.VFC = (args) => <SearchIcon {...args} />;
