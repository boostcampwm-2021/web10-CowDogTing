import { AxiosResponse } from "axios";
import { RefObject } from "react";

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

export const responseCheck = (response: AxiosResponse) => {
  if (response.status >= 400) {
    return new Error("error");
  }
  return "";
};
