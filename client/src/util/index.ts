import { RefObject } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Recoil/Atom";

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

export const checkLogin = () => {
  const userInfo = useRecoilValue(userState);
  return userInfo.id !== "";
};
