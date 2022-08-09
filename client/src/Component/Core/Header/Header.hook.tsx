import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderRefToggle = (callback: () => void): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(ref, callback);
  return ref;
};

export const useCheckHook = (callback: () => void) => {
  const serarchParams = new URLSearchParams(useLocation().search);
  const person = Number(serarchParams.get("person"));
  useEffect(() => {
    if (!person) return;
    callback();
  }, [person]);
};
