import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../../Common/type";

const TeamButtonContainerStyle = css`
  display: flex;
  width: 60vw;
  height: 20%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 3vh;
`;
export const TeamButtonContainer: React.FC<ChildrenType> = ({ children }) => {
  return <div css={TeamButtonContainerStyle}>{children}</div>;
};
