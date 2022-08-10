import React from "react";
import { ComponentMeta } from "@storybook/react";
import { MainHeaderLogo } from "./MainHeaderLogo";

export default {
  component: MainHeaderLogo,
  title: "MainHeaderLogo",
} as ComponentMeta<typeof MainHeaderLogo>;

export const Primary: React.VFC = () => <MainHeaderLogo />;
