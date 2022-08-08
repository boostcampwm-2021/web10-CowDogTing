import { teamState } from "@Recoil/TeamData";
import { userState } from "@Recoil/UserData";
import { postImage } from "@Util/data";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useHandleImageEdit = (checkPathName: boolean) => {
  const { id, gid } = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const setTeamInfo = useSetRecoilState(teamState);

  const handleImageEdit = (imageFile: Blob) => async () => {
    let targetId;
    let handler;

    if (checkPathName) {
      targetId = id;
      handler = setUserInfo;
    } else {
      targetId = String(gid);
      handler = setTeamInfo;
    }

    const url = await postImage(imageFile, targetId);

    handler((prev: any) => ({
      ...prev,
      image: url,
    }));
  };

  return handleImageEdit;
};

const initBlob = new Blob();
const reader = new FileReader();
const defaultImage = "/Asset/meetingImage.png";

export const useHandleImage = (checkPathName: boolean) => {
  const [imageFile, setImageFile] = useState<Blob>(initBlob);
  const { image: userImage } = useRecoilValue(userState);
  const { image: teamImage } = useRecoilValue(teamState);
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>((checkPathName ? userImage : teamImage) ?? defaultImage);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    if (imageFile === initBlob) return;
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return { imageFile, profileImage, changeImage };
};

export const useHandleImageClick = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleClickImage = () => (imageRef.current as HTMLInputElement).click();
  return { imageRef, handleClickImage };
};
