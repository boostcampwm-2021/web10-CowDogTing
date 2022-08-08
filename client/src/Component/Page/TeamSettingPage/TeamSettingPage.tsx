/* eslint-disable no-console */
import React from "react";
import { useRecoilValue } from "recoil";
import { TeamSettingTemplate } from "@Template/TeamSettingTemplate";
import { userState } from "@Recoil/UserData";
import TeamCreatePage from "../TeamCreatepage/TeamCreatePage";

export const TeamSettingPage: React.FC = () => {
  const { gid } = useRecoilValue(userState);
  if (gid && gid !== 0) return <TeamSettingTemplate />;
  return <TeamCreatePage />;
};
