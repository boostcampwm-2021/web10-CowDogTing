import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Chat, ChatProps } from "./Chat";

export default {
  component: Chat,
  title: "Chat",
} as ComponentMeta<typeof Chat>;

export const Primary: React.VFC<ChatProps> = (args) => <Chat {...args} />;
export const MyChat: React.VFC<ChatProps> = () => <Chat from="hihi" type="Mine" message="안녕하세요" src={null} />;
export const OtherChat: React.VFC<ChatProps> = () => <Chat from="hihi" type="Other" message="안녕히가세요" src={null} />;
