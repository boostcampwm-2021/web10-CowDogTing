import { useState } from "react";

type useToggleHookType = (init?: boolean | undefined) => [boolean, () => void, () => void];

export const useToggleHook: useToggleHookType = (init) => {
  const [state, setState] = useState(init ?? false);
  const handleToggleState = () => setState((prev) => !prev);
  const handleFalseState = () => setState(false);
  return [state, handleToggleState, handleFalseState];
};
