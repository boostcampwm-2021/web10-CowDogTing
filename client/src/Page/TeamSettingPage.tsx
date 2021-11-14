/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import TeamSettingTemplate from "../Template/TeamSettingTemplate";
import TeamCreatePage from "./TeamCreatePage";
import { userState, teamState } from "../Recoil/Atom";
import { fetchGet } from "../Recoil/Selector";
import { checkLogin, passToLoginPage } from "../util";

function TeamSettingPage() {
  const userInfo = useRecoilValue(userState);
  const { gid } = userInfo;
  const teamInfoUrl = `${process.env.REACT_APP_GET_TEAM_INFO_API_URL}`;
  const setTeamInfo = useSetRecoilState(teamState);
  const teamSelector = useRecoilValue(fetchGet({ url: teamInfoUrl, query: "" }));

  if (!checkLogin()) passToLoginPage();

  useEffect(() => {
    setTeamInfo(teamSelector);
  }, [teamSelector]);

  useEffect(() => {
    if (!checkLogin()) passToLoginPage();
  }, []);

  return <>{gid ? <TeamSettingTemplate /> : <TeamCreatePage />}</>;
}

export default TeamSettingPage;
