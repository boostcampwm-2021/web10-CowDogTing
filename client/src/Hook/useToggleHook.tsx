import { useState } from "react";

type useToggleHookType = () => [boolean, () => void, () => void];

export const useToggleHook: useToggleHookType = () => {
  const [state, setState] = useState(false);
  const handleToggleState = () => setState((prev) => !prev);
  const handleFalseState = () => setState(false);
  return [state, handleToggleState, handleFalseState];
};
