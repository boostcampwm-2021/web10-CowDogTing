/** @jsxImportSource @emotion/react */
import React from "react";
import TeamCreateIcon from "../Atom/TeamCreateIcon";
import Header from "../Organism/Header";

function TeamSettingPage() {
  const teamState = false;

  return (
    <>
      <Header />
      {teamState ? "aa" : <TeamCreateIcon />}
    </>
  );
}

export default TeamSettingPage;
