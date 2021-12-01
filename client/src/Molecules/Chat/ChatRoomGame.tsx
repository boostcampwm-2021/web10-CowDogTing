/* eslint-disable consistent-return */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router";
import { gameDatas } from "../../util/constant";

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20vw;
  width: 50vw;
  height: 70vh;
  border: 1px solid #000000;
  /* margin-top: 10%; */
`;

const ButtonContainerStyle = css`
  margin-top: 5%;
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;
`;

export default function ChatRoomGame() {
  const searchParams = new URLSearchParams(useLocation().search);
  const index = Number(searchParams.get("index"));

  return (
    <>
      <div css={ButtonContainerStyle} />
      <div css={containerStyle}>
        <iframe title={gameDatas[index - 1].title} src={gameDatas[index - 1].src} width="100%" height="100%" />
      </div>
    </>
  );
}
