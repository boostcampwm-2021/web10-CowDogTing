/* eslint-disable no-console */
import { RefObject, useEffect } from "react";

export default function useModalEvent(ref: RefObject<HTMLDivElement>, handler: (event: MouseEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      const closestElement = target.closest(".Profile");
      if (closestElement) return;
      if (!ref.current || ref.current.contains(target)) {
        console.log(111);
        return;
      }
      console.log(222);
      handler(event);
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref]);
}