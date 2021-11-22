/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProfileImage from "../Atom/ProfileImage";
import { Button } from "../Atom/Button";
import { postImage } from "../util/data";
import { teamState, userState } from "../Recoil/Atom";
import { fileReader, isNumber } from "../util";
import defaultImage from "../assets/meetingImage.png";
// import { getFetch, postImage } from "../util/data";
// import { userState, teamState } from "../Recoil/Atom";
// import { GET_IMAGE_API_URL } from "../util/URL";

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
function TeamInfoImageContainer() {
  const { id, gid } = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const setTeamInfo = useSetRecoilState(teamState);

  let image: string | number;

  const initBlob = new Blob();
  const imageInputTag = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [imageFile, setImageFile] = useState<Blob>(initBlob);

  if (window.location.href.includes("myinfo")) {
    image = useRecoilValue(userState).image;
  } else {
    image = useRecoilValue(teamState).image;
  }
  const clickImageTag = () => {
    (imageInputTag.current as HTMLInputElement).click();
  };

  const changeImage: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageFile(event.target.files[0]);
  };

  const handleImageEdit = () => {
    if (window.location.href.includes("myinfo")) {
      postImage(imageFile, id);
      fileReader({ data: imageFile, handler: setUserInfo });
    } else {
      postImage(imageFile, String(gid));
      fileReader({ data: imageFile, handler: setTeamInfo });
    }
  };

  useEffect(() => {
    if (imageFile === initBlob) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (!isNumber(image as any)) {
      setProfileImage(String(image));
    }
    if (!image) {
      setProfileImage(defaultImage);
    }
  }, []);

  return (
    <div css={TeamInfoImageContainerStyle}>
      <ProfileImage type="Big" image={profileImage} onClick={clickImageTag}>
        <Button type="Small" onClick={handleImageEdit}>
          Edit
        </Button>
      </ProfileImage>
      <input ref={imageInputTag} onChange={changeImage} css={imageInputStyle} type="file" accept="image/*" />
    </div>
  );
}

export default TeamInfoImageContainer;
