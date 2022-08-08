import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "@Util/type";

export const MainBodyRightButtonContainer: React.FC<ChildrenType> = ({ children }) => {
  return <div css={mainBodyRightButtonContainerStyle}>{children}</div>;
};

const mainBodyRightButtonContainerStyle = css`
  display: none;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
