import React from "react";
import { ComponentMeta } from "@storybook/react";
import { NavbarDiv } from "./NavbarDiv";

export default {
  component: NavbarDiv,
  title: "NavbarDiv",
} as ComponentMeta<typeof NavbarDiv>;

export const Primary: React.VFC = () => <NavbarDiv>hihi</NavbarDiv>;
