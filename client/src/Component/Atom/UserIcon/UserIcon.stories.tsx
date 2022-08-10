import React from "react";
import { ComponentMeta } from "@storybook/react";
import { UserIcon, UserIconProps } from "./UserIcon";

export default {
  component: UserIcon,
  title: "UserIcon",
} as ComponentMeta<typeof UserIcon>;

export const Primary: React.VFC<UserIconProps> = (args) => <UserIcon {...args} />;
