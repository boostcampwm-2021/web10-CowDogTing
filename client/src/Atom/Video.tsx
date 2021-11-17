/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PersonInfoType } from "../util/type";

const GameStyle = css`
  width: 150px;
  height: 150px;
`;

const GatherStyle = css`
  width: 150px;
  height: 150px;
`;

const containerStyle = (props: { type: string }) => css`
  width: 250px;
  height: 250px;
  border: 1px solid #000000;
  ${props.type === "Game" && GameStyle}
  ${props.type === "Gather" && GatherStyle}
`;

export default function Video({ member, type }: { member: PersonInfoType; type: string }) {
  const { id } = member;
  return <div css={containerStyle({ type })}>{id}</div>;
}
