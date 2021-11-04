/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PersonInfoType } from "../util/type";
import Video from "../Atom/Video";

const containerStyle = css`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px;
  padding-top: 0;
`;

export default function ChatRoomBasic(props: { member: PersonInfoType[] | null }) {
  return (
    <div css={containerStyle}>
      {props.member?.map((person) => (
        <Video member={person} />
      ))}
    </div>
  );
}
