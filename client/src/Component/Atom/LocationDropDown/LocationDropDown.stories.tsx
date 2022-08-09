import React from "react";
import { ComponentMeta } from "@storybook/react";
import { LocationDropDown, LocationDropDownProps } from "./LocationDropDown";

export default {
  component: LocationDropDown,
  title: "LocationDropDown",
} as ComponentMeta<typeof LocationDropDown>;

const args = { locSelected: "서울", id: "서울", handleLocationSelected: () => {} };
export const Primary: React.VFC<LocationDropDownProps> = () => <LocationDropDown {...args} />;
