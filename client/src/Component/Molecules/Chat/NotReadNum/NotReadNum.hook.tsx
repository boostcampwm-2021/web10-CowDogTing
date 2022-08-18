import { joinChatType } from "@Common/type";
import { joinChatRoomSelector } from "@Recoil/ChatData";
import { useRecoilValue } from "recoil";

export const useCountNotReadChat = ({ type }: { type: string }) => {
  const datas = useRecoilValue(joinChatRoomSelector);
  const num = countNotReadNum(datas, type);
  return num;
};

export const countNotReadNum = (datas: joinChatType[], type: string) => {
  if (type === "Total") return datas.reduce((acc, cur) => acc + cur.notReadNum, 0);
  return datas.filter((data) => data.chatRoomId === Number(type))[0]?.notReadNum ?? 0;
};
