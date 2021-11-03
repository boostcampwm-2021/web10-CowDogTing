/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { ProfileImage } from "../Atom/ProfileImage";
import { TeamImageContainerType } from "../util/type";

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

function TeamInfoImageContainer({ image }: TeamImageContainerType) {
  const imageInputTag = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(image);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<Blob>(new Blob());
  const clickImageTag = () => {
    (imageInputTag.current as HTMLInputElement).click();
  };
  const changeImage: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImageFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <div css={TeamInfoImageContainerStyle}>
      <ProfileImage type="Big" image={profileImage} onClick={clickImageTag} />
      <input ref={imageInputTag} onChange={changeImage} css={imageInputStyle} type="file" accept="image/*" />
    </div>
  );
}

export default TeamInfoImageContainer;
