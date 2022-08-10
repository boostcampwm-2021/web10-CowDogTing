import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../../../Common/type";

const ChatInputContainerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ffcfcf;
  justify-content: space-around;
`;

export const ChatInputContainer = ({ children }: ChildrenType) => {
  return <div css={ChatInputContainerStyle}>{children}</div>;
};
