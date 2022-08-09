import React from "react";
import { css } from "@emotion/react";
import { ChatListInfoType } from "@Util/type";

const ChatProfileInfoContainerStyle = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const ChatProfileTextStyle = css`
  margin: 10px auto;
  font-size: 20px;
  font-weight: bold;
`;

export const ChatProfileInfoContainer = ({ lastChat, from }: ChatListInfoType) => {
  return (
    <div css={ChatProfileInfoContainerStyle}>
      <p css={ChatProfileTextStyle}>{from}</p>
      <p css={ChatProfileTextStyle}>{lastChat}</p>
    </div>
  );
};
