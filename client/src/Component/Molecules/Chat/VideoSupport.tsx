import React from "react";
import { css } from "@emotion/react";

const supportStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #000000;
`;

const containerStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 100px;
`;

export const VideoSupport = () => {
  return (
    <div css={containerStyle}>
      <div css={supportStyle} />
      <div css={supportStyle} />
    </div>
  );
};
