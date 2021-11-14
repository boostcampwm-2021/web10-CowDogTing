/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const InfoContainerStyle = css`
  display: flex;
  min-height: 450px;
  min-width: 640px;
  width: 60vw;
  height: 60vh;
  border: 1px solid #b0c2ff;
  align-items: center;
`;

export default function InfoContainer({ children }: ChildrenType) {
  return <div css={InfoContainerStyle}>{children}</div>;
}
