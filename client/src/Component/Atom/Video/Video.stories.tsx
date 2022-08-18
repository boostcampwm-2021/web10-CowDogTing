import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Video, VideoProps } from "./Video";

export default {
  component: Video,
  title: "Video",
} as ComponentMeta<typeof Video>;

export const Primary: React.VFC<VideoProps> = (args) => <Video {...args} />;
