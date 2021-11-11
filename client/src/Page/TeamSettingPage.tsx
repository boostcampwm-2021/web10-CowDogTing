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
  const setTeamInfo = useSetRecoilState(teamState);
  const teamSelector = useRecoilValue(fetchGet({ url: "/api/team/info", query: `?teamId=${gid}` }));

  useEffect(() => {
    setTeamInfo(teamSelector);
  }, [teamSelector]);

  return <>{gid ? <TeamSettingTemplate /> : <TeamCreatePage />}</>;
}

export default TeamSettingPage;
