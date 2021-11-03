/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const flexStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 100px;
`;

const supportStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #000000;
`;

const containerStyle = (props: { type: string }) => css`
  width: 200px;
  height: 250px;
  ${props.type === "basic" && flexStyle}
`;

export default function VideoSupport(props: { type: string }) {
  return (
    <div css={containerStyle({ type: props.type })}>
      <div css={supportStyle} />
      <div css={supportStyle} />
    </div>
  );
}
