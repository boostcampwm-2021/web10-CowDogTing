import React from "react";
import { useRecoilValue } from "recoil";
import { userStateSelector } from "@Recoil/UserData";
import { TeamCreateTemplate, TeamSettingTemplate } from "@Template/.";

export const TeamSettingPage: React.FC = () => {
  const { gid } = useRecoilValue(userStateSelector);
  if (gid && gid !== 0) return <TeamSettingTemplate />;
  return <TeamCreateTemplate />;
};
