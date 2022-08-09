import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Button, ButtonType } from "./Button";

export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>;

export const Primary: React.VFC<ButtonType> = () => (
  <Button color="#ff0" size="">
    hihi{" "}
  </Button>
);
export const MediumButton: React.VFC<ButtonType> = () => <Button size="Medium">hihi</Button>;
export const LargeButton: React.VFC<ButtonType> = () => <Button size="Large">hihi</Button>;
export const LargeDropDownButton: React.VFC<ButtonType> = () => <Button size="LargeDropDown">hihi</Button>;
export const NaverLoginButton: React.VFC<ButtonType> = () => (
  <Button size="Long" color="#2DB400">
    hihi
  </Button>
);

export const GitLoginButton: React.VFC<ButtonType> = () => (
  <Button size="Long" color="#000000">
    hihi
  </Button>
);
export const KakaoLoginButton: React.VFC<ButtonType> = () => (
  <Button size="Long" color="#f3e84d">
    hihi
  </Button>
);
