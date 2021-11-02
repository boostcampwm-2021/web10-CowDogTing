/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import TeamCreateContainer from "../Organism/TeamCreateContainer";
import Header from "../Organism/Header";
import TeamCreateButtonContainer from "../Organism/TeamCreateButtonContainer";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
  flex-direction: column;
`;

function TeamCreatePage() {
  return (
    <>
      <Header />
      <div css={TeamCreatePageStyle}>
        <TeamCreateContainer />
        <TeamCreateButtonContainer />
      </div>
    </>
  );
}

export default TeamCreatePage;
