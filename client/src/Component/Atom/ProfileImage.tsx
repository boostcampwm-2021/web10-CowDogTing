import { css } from "@emotion/react";
import { ProfileImageType } from "@Util/type";
import { URL } from "@Util/URL";
const defaultImage = "/Asset/meetingImage.png";
export const ProfileImage: React.FC<ProfileImageType> = ({ type, onClick, ref, children, image }) => {
  const src = String(image).includes("/uploads") ? URL + String(image ?? defaultImage) : image ?? defaultImage;
  return (
    <div ref={ref}>
      <img alt="ProfileImage" css={profileImageStyle({ type })} src={String(src)} onClick={onClick} />
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

const profileImageStyle = ({ type }: { type: string }) => css`
  ${type === "Big" && bigProfileImageStyle};
  ${type === "Mini" && miniProfileImageStyle};
  ${type === "Small" && smallProfileImageStyle};
  background-size: cover;
  cursor: pointer;
`;
