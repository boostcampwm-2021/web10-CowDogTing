import React from "react";
import TeamCreateIcon from "../Atom/TeamCreateIcon";
import TeamSettingTemplate from "../Template/TeamSettingTemplate";

function TeamSettingPage() {
  const teamState = true;

  return <>{teamState ? <TeamSettingTemplate /> : <TeamCreateIcon />}</>;
}

export default TeamSettingPage;
