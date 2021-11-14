/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
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
  const initBlob = new Blob();
  const imageInputTag = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(image);
  const [imageFile, setImageFile] = useState<Blob>(initBlob);

  const clickImageTag = () => {
    (imageInputTag.current as HTMLInputElement).click();
  };

  const changeImage: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImageFile(event.target.files[0]);
  };

  useEffect(() => {
    if (imageFile === initBlob) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return (
    <div css={TeamInfoImageContainerStyle}>
      <ProfileImage type="Big" image={profileImage} onClick={clickImageTag} />
      <input ref={imageInputTag} onChange={changeImage} css={imageInputStyle} type="file" accept="image/*" />
    </div>
  );
}

export default TeamInfoImageContainer;
