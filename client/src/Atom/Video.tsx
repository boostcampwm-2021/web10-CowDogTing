/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PersonInfoType } from "../util/type";

const containerStyle = css`
  width: 250px;
  height: 250px;
  border: 1px solid #000000;
`;

export default function Video({ member }: { member: PersonInfoType }) {
  const { id } = member;
  return <div css={containerStyle}>{id}</div>;
}
