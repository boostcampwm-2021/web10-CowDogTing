/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../util/type";

const ChatInputContainerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ffcfcf;
  justify-content: space-around;
`;

function ChatInputContainer({ children }: ChildrenType) {
  return <div css={ChatInputContainerStyle}>{children}</div>;
}
export default ChatInputContainer;
