/* eslint-disable no-console */
import React from "react";
import { useRecoilValue } from "recoil";
import TeamSettingTemplate from "../../Template/TeamSettingTemplate";
import TeamCreatePage from "../TeamCreatepage/TeamCreatePage";
import { userState } from "../../../Recoil/Atom";
import { checkLogin, passToLoginPage } from "../../../Util";

export const TeamSettingPage: React.FC = () => {
  const { gid } = useRecoilValue(userState);
  if (!checkLogin()) {
    passToLoginPage();
  }

  return <>{gid && gid !== 0 ? <TeamSettingTemplate /> : <TeamCreatePage />}</>;
};
