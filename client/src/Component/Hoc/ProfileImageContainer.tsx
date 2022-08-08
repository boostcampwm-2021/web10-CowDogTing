import React from "react";
import { css } from "@emotion/react";
import { ChildrenType } from "../../Util/type";

const ProfileImageContainerStyle = css`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageContainer: React.FC<ChildrenType> = ({ children }) => {
  return <div css={ProfileImageContainerStyle}>{children}</div>;
};

export default ProfileImageContainer;
