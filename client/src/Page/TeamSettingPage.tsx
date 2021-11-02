import React from "react";
import TeamCreateIcon from "../Atom/TeamCreateIcon";
import Header from "../Organism/Header";
import TeamSettingTemplate from "../Template/TeamSettingTemplate";

function TeamSettingPage() {
  const teamState = true;

  return (
    <>
      <Header />
      {teamState ? <TeamSettingTemplate /> : <TeamCreateIcon />}
    </>
  );
}

export default TeamSettingPage;
