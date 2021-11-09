/* eslint-disable no-console */
import { useEffect } from "react";

export default function useModalEvent(handler: (event: MouseEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      const closestElement = (event.target as HTMLElement).closest(".Profile");
      if (closestElement) return;
      handler(event);
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [handler]);
}
