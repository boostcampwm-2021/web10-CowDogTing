/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, teamState } from "../Recoil/Atom";
import { fetchGet } from "../Recoil/Selector";
import TeamSettingTemplate from "../Template/TeamSettingTemplate";
import TeamCreatePage from "./TeamCreatePage";

function TeamSettingPage() {
  const userInfo = useRecoilValue(userState);
  const { gid } = userInfo;
  const teamInfoUrl = `${process.env.REACT_APP_GET_TEAM_INFO_API_URL}`;
  const setTeamInfo = useSetRecoilState(teamState);
  const teamSelector = useRecoilValue(fetchGet({ url: teamInfoUrl, query: "" }));

  useEffect(() => {
    setTeamInfo(teamSelector);
  }, [teamSelector]);

  return <>{gid ? <TeamSettingTemplate /> : <TeamCreatePage />}</>;
}

export default TeamSettingPage;
