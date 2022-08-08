import { useNavigate } from "react-router-dom";

export const useMovePage = (src: string | string[]) => {
  if (typeof src === "string") {
    src = [src];
  }
  const navigator = useNavigate();
  const funcs = src.map((path) => () => navigator(path));
  return funcs;
};
