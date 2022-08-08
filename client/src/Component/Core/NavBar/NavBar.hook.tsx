import { useState } from "react";

export const useNavBarStateHook = (navBarRef: React.MutableRefObject<HTMLDivElement[]>) => {
  const [dropDownState, setDropDownState] = useState("");

  const handleDropDownClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target: HTMLElement = e.target as HTMLElement;

    navBarRef.current.forEach((ref, index) => {
      if (ref.contains(target)) {
        const { id } = list[index];
        setDropDownState((prev) => (prev === id ? "" : id));
      }
    });
  };

  const closeCallbackFunc = () => setDropDownState("");

  return { dropDownState, closeCallbackFunc, handleDropDownClick };
};

const list = [
  { id: "Location", name: "지역" },
  { id: "Age", name: "나이" },
  { id: "Sex", name: "성별" },
];
