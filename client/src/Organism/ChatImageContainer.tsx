/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChatImageContainerType } from "../util/type";
import { ProfileImage } from "../Atom/ProfileImage";

const ChatImageContainerStyle = css`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function ChatImageContainer({ member }: ChatImageContainerType) {
  return (
    <div css={ChatImageContainerStyle}>
      {member?.map((userInfo, idx) => (
        <ProfileImage type="Mini" image={userInfo.image} data-id={idx} />
      ))}
    </div>
  );
}

export default ChatImageContainer;
