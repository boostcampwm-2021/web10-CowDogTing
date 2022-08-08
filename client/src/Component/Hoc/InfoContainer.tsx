/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../../Util/type";

const InfoContainerStyle = css`
  display: flex;
  min-height: 450px;
  width: 30vw;
  height: 100%;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-right: 100px;
`;

export const InfoContainer: React.FC<ChildrenType> = ({ children }) => {
  return <div css={InfoContainerStyle}>{children}</div>;
};
