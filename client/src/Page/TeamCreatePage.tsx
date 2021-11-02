/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import TeamCreateContainer from "../Organism/TeamCreateContainer";
import Header from "../Organism/Header";

const TeamCreatePageStyle = css`
  position: relative;
  display: flex;
  margin: 2vh auto auto auto;
  width: 50vw;
  height: 70vh;
`;

function TeamCreatePage() {
  return (
    <>
      <Header />
      <div css={TeamCreatePageStyle}>
        <TeamCreateContainer />
      </div>
    </>
  );
}

export default TeamCreatePage;
