/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { Button } from "../Atom/Button";

const mainBodyLeftButtonContainerStyle = css`
  display: none;
  top: 100px;
  left: 100px;
  width: 30vw;
  height: 30vh;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MainBodyLeftButtonContainer() {
  return (
    <div css={mainBodyLeftButtonContainerStyle}>
      <Link to="/sub/CowDogPage?person=1">
        <Button type="Medium">1:1 소개팅</Button>
      </Link>
      <Link to="/sub/CowDogPage?person=2">
        <Button type="Medium">2:2 미팅</Button>
      </Link>
      <Link to="/sub/CowDogPage?person=3">
        <Button type="Medium">3:3 미팅</Button>
      </Link>
      <Link to="/sub/teamCreate">
        <Button type="Medium">팀 설정</Button>
      </Link>
    </div>
  );
}

export default MainBodyLeftButtonContainer;
