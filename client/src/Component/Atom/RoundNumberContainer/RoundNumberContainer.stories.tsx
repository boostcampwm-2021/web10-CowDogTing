import React from "react";
import { ComponentMeta } from "@storybook/react";
import { RoundNumberContainer, RoundNumberType } from "./RoundNumberContainer";

export default {
  component: RoundNumberContainer,
  title: "RoundNumberContainer",
} as ComponentMeta<typeof RoundNumberContainer>;

export const Primary: React.VFC<RoundNumberType> = (args) => <RoundNumberContainer {...args} />;
