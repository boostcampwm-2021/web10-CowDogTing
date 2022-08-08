import React from "react";
import { css } from "@emotion/react";
import { MainHeaderLogo } from "@Atom/.";

const mainHeaderCenterStyle = css`
  position: relative;
  width: 210px;
  margin: 0 auto;
  top: 30%;
`;

export const MainHeaderCenter: React.FC = () => {
  return (
    <div css={mainHeaderCenterStyle}>
      <MainHeaderLogo />
    </div>
  );
};
