import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ChatIcon, ChatIconProps } from "./ChatIcon";

export default {
  component: ChatIcon,
  title: "ChatIcon",
} as ComponentMeta<typeof ChatIcon>;

export const Primary: React.VFC<ChatIconProps> = () => <ChatIcon onClick={() => {}} />;
