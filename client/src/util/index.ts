/* eslint-disable no-console */
import { RefObject } from "react";
import { PersonInfoType } from "./type";

export const handleModalClick = (e: React.MouseEvent, refs: RefObject<HTMLDivElement[]>, handler: (value: any) => void) => {
  if (!refs.current) {
    handler(null);
    return;
  }

  const target: HTMLElement = e.target as HTMLElement;

  const clickCard = refs.current
    .map((ref) => {
      if (!ref) return null;
      if (ref.contains(target)) return ref;
      return null;
    })
    .filter((ref) => ref)[0];
  if (!clickCard) {
    handler(null);

    return;
  }

  const { id } = clickCard.dataset;

  handler((prev: number) => (prev === Number(id) ? null : Number(id)));
};

export const passToLoginPage = () => {
  window.location.href = "/sub/login";
};

export const checkLogin = (userInfo: PersonInfoType) => {
  return userInfo.id !== "";
};

export const checkGameInUrl = () => {
  return window.location.href.includes("Game");
};

export const checkGatherInUrl = () => {
  return window.location.href.includes("Gather");
};

export const isNumber = (n: string) => /^-?[\d.]+(?:e-?\d+)?$/.test(n);

export const fileReader = ({ data, handler }: { data: Blob; handler: Function }) => {
  const file = new File([data], "image");
  const reader = new FileReader();
  reader.onload = (event) => {
    const image = String(event.target?.result);
    handler((prev: any) => ({
      ...prev,
      image,
    }));
  };
  reader.readAsDataURL(file);
};

export const fromImageToForm = (chatRoomId: number, uId: string, files: Blob) => {
  const formData = new FormData();
  formData.append("image", files);
  formData.append("from", uId);
  formData.append("message", "");
  formData.append("chatRoomId", String(chatRoomId));
  return formData;
};
