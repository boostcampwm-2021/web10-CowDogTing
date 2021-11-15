import { RefObject } from "react";
import { PersonInfoType, ProfileType } from "./type";

export const handleModalClick = (e: React.MouseEvent, refs: RefObject<HTMLDivElement[]>, handler: (value: any) => void) => {
  if (!refs.current) {
    handler(null);
    return;
  }

  const target: HTMLElement = e.target as HTMLElement;

  const clickCard = refs.current
    .map((ref) => {
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

export const requestAccept = (id: string | number) => {
  console.log("data 요청해야함");
  console.log(id);
};

export const requestDeny = (id: string | number) => {
  console.log("data 요청해야함");
  console.log(id);
};

export const requestChat = (data: ProfileType): boolean => {
  const { id } = data;
  console.log(id);
  return true;
};
