import React from "react";
import { css } from "@emotion/react";
import { ProfileImage } from "@Atom/.";

const dummyImage = "Asset/meetingImage.png";
const ProfileImageContainerStyle = css`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageContainer: React.FC = () => {
  return (
    <div css={ProfileImageContainerStyle}>
      <ProfileImage type="Small" image={dummyImage} />
    </div>
  );
};

export default ProfileImageContainer;
