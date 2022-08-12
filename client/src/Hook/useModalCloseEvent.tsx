import { RefObject, useEffect } from "react";

export default function useModalCloseEvent(ref: RefObject<HTMLDivElement>, profileRef: RefObject<HTMLDivElement[]>, handler: (event: MouseEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      let flag = false;
      const target: HTMLElement = event.target as HTMLElement;
      if (!ref.current || ref.current.contains(target)) return;
      if (!profileRef.current) return handler(event);

      profileRef.current.forEach((userRef) => {
        if (flag) return;
        if (!userRef) return;
        if (userRef.contains(target)) flag = true;
      });

      if (flag) return;
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref]);
}
