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
export default function ChatRoomGather() {
  return <div css={containerStyle}>게더타운입니다.</div>;
}
