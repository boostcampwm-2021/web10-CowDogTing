/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
export default function ChatRoomGame() {
  return <div css={containerStyle}>게임방입니다.</div>;
}
