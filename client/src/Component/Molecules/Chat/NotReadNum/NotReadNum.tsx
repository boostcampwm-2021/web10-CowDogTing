import { RoundNumberContainer } from "@Atom/.";
import { useCountNotReadChat } from "./NotReadNum.hook";

export const NotReadNum = ({ type }: { type: string }) => {
  const num = useCountNotReadChat({ type });
  return <RoundNumberContainer num={num} />;
};
