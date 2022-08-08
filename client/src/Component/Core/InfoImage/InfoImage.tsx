import React from "react";
import { css } from "@emotion/react";
import { ProfileImage } from "@Atom/ProfileImage";
import { Button } from "@Atom/Button";
import { useGetParams } from "@Hook/useGetParams";
import { useHandleImage, useHandleImageClick, useHandleImageEdit } from "./InfoImage.hook";

const TeamInfoImageContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const imageInputStyle = css`
  display: none;
`;

export const InfoImage: React.FC = () => {
  const checkPathName = useGetParams("myInfo");
  const { imageRef, handleClickImage } = useHandleImageClick();
  const { imageFile, profileImage, changeImage } = useHandleImage(checkPathName);
  const handleImageEdit = () => useHandleImageEdit(checkPathName)(imageFile);

  return (
    <div css={TeamInfoImageContainerStyle}>
      <ProfileImage type="Big" image={profileImage} onClick={handleClickImage}>
        <Button size="Small" onClick={handleImageEdit}>
          Edit
        </Button>
      </ProfileImage>
      <input ref={imageRef} onChange={changeImage} css={imageInputStyle} type="file" accept="image/*" />
    </div>
  );
};
