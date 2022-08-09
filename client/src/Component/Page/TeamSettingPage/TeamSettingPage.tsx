import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@Recoil/UserData";
import { TeamCreateTemplate, TeamSettingTemplate } from "@Template/.";

export const TeamSettingPage: React.FC = () => {
  const { gid } = useRecoilValue(userState);
  if (gid && gid !== 0) return <TeamSettingTemplate />;
  return <TeamCreateTemplate />;
};
