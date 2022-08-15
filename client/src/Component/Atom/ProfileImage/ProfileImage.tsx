import React from "react";
import { css } from "@emotion/react";
import { URL } from "@Common/URL";
import styled from "@emotion/styled";

const defaultImage = "/Asset/meetingImage.png";
export type ProfileImageType = {
  image: string | ArrayBuffer | null;
  type: string;
  onClick?: React.MouseEventHandler;
  profileRef?: (el: any) => HTMLDivElement;
  children?: React.ReactNode;
};

export const ProfileImage: React.FC<ProfileImageType> = ({ type, onClick, profileRef, children, image }) => {
  const src = String(image).includes("/uploads") ? URL + String(image ?? defaultImage) : image ?? defaultImage;
  return (
    <div ref={profileRef}>
      <ProfileImageContainer type={type} alt="ProfileImage" aria-hidden="true" src={String(src)} onClick={onClick} />
      {children}
    </div>
  );
};

const bigProfileImageStyle = css`
  width: 300px;
  height: 300px;
  border-radius: 150px;
`;
const smallProfileImageStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const miniProfileImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

type imageType = { type: string };
const profileImageStyle = ({ type }: imageType) => css`
  ${type === "Big" && bigProfileImageStyle};
  ${type === "Mini" && miniProfileImageStyle};
  ${type === "Small" && smallProfileImageStyle};
`;

const ProfileImageContainer = styled.img<imageType>`
  background-size: cover;
  cursor: pointer;
  ${profileImageStyle}
`;
