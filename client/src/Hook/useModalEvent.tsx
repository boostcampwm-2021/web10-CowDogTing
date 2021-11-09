/* eslint-disable no-console */
import { RefObject, useLayoutEffect } from "react";

export default function useModalEvent(ref: RefObject<HTMLDivElement>, handler: () => void) {
  useLayoutEffect(() => {
    function listener(event: MouseEvent) {
      const target: HTMLElement = event.target as HTMLElement;
      console.log(ref.current);
      if (!ref.current || ref.current.contains(target)) {
        // console.log("?");
        return;
      }
      handler();
    }

    document.addEventListener("click", (e) => listener(e));
    return document.removeEventListener("click", listener);
  }, [ref, handler]);
}
