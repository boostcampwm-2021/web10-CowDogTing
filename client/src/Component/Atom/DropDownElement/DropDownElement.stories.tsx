import React from "react";
import { ComponentMeta } from "@storybook/react";
import { DropDownElement, DropDownElementProps } from "./DropDownElement";

export default {
  component: DropDownElement,
  title: "DropDownElement",
} as ComponentMeta<typeof DropDownElement>;

const primaryMenu = { name: "로그아웃" };
const OtherMenu = { name: "anything" };

export const Primary: React.VFC<DropDownElementProps> = (args) => <DropDownElement {...args} />;
export const LogOut: React.VFC<DropDownElementProps> = () => <DropDownElement menu={primaryMenu} onClick={undefined} />;
export const DropDown: React.VFC<DropDownElementProps> = () => <DropDownElement menu={OtherMenu} onClick={undefined} />;
