/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProfileImage from "../Atom/ProfileImage";
import { Button } from "../Atom/Button";
import { postImage } from "../util/data";
import { teamState, userState } from "../Recoil/Atom";
import defaultImage from "../assets/meetingImage.png";
// import { fileReader } from "../util";
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

  let image: string | null;

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

  const handleImageEdit = async () => {
    let targetId;
    let handler;

    if (window.location.href.includes("myinfo")) {
      targetId = id;
      handler = setUserInfo;
    } else {
      targetId = String(gid);
      handler = setTeamInfo;
    }

    const url = await postImage(imageFile, targetId);
    console.log(url);

    handler((prev: any) => ({
      ...prev,
      image: url,
    }));
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
    setProfileImage(image ?? defaultImage);
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
