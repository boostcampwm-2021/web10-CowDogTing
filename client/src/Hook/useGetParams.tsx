import { useLocation } from "react-router-dom";

export const useGetParams = (search: string) => {
  const { pathname } = useLocation();
  const checkPathName = pathname.includes(search);
  return checkPathName;
};
