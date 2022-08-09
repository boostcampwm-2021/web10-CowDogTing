import { RefObject } from "react";

export const handleModalClick = (refs: RefObject<HTMLDivElement[]>, handler: (value: any) => void) => (e: React.MouseEvent) => {
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
  window.location.href = "/login";
};

export const checkLogin = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  return isLogin === "true";
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

export const makeCategory = (category: string | null) => {
  if (category === null) return "";

  if (category === "남자" || category === "여자") return `&sex=${category === "남자" ? "male" : "female"}`;
  const target = transAgeToNumber(category);
  if (category.includes("0")) return `&age=${target}`;
  return `&location=${category}`;
};

export const transAgeToNumber = (string: string) => {
  return string.split("대")[0];
};
