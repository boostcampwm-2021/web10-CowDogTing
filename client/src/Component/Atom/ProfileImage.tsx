/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ProfileImageType } from "../../util/type";
import { URL } from "../../util/URL";
import defaultImage from "../assets/meetingImage.png";

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

const profileImageStyle = ({ type }: { type: string }) => css`
  ${type === "Big" && bigProfileImageStyle}
  ${type === "Mini" && miniProfileImageStyle}
  ${type === "Small" && smallProfileImageStyle}
  background-size: cover;
  cursor: pointer;
`;

export default function ProfileImage(props: ProfileImageType) {
  const { type, onClick, ref, children, image } = props;
  let src = image ?? defaultImage;
  if (String(image).includes("/uploads")) {
    src = URL + String(src);
  }

  return (
    <div ref={ref}>
      <img alt="ProfileImage" css={profileImageStyle({ type })} src={String(src)} onClick={onClick} />
      {children}
    </div>
  );
}
