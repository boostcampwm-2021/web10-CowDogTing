/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { Button } from "../Atom/Button";

const TeamCreateButtonContainerStyle = css`
  display: flex;
  width: 100%;
  height: 20%;
  align-items: center;
  justify-content: space-around;
  margin-top: 3vh;
`;
function TeamCreateButtonContainer() {
  return (
    <div css={TeamCreateButtonContainerStyle}>
      <Link to="/teamSetting">
        <Button type="Medium">생성</Button>
      </Link>
      <Link to="/teamSetting">
        <Button type="Medium">삭제</Button>
      </Link>
    </div>
  );
}

export default TeamCreateButtonContainer;
