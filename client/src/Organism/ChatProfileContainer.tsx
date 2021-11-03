/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChatProfileContainerType } from "../util/type";
import ProfileCard from "../Atom/ProfileCard";

const ChatProfileContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ChatProfileContainer({ chatsInfo }: ChatProfileContainerType) {
  return (
    <div css={ChatProfileContainerStyle}>
      {chatsInfo?.data.map((data, idx) => {
        const memberType = data.member.length > 1 ? "team" : data.member[0].sex;
        return <ProfileCard type={memberType} idx={idx} />;
      })}
    </div>
  );
}

export default ChatProfileContainer;
