import { useRecoilValue } from "recoil";
import { joinChatRoomState } from "@Recoil/ChatData";
import { RoundNumberContainer } from "@Atom/.";
import { joinChatType } from "@Util/type";

export const NotReadNum = ({ type }: { type: string }) => {
  const datas = useRecoilValue(joinChatRoomState);
  const notReadNum = countNotReadNum(datas, type);
  return <RoundNumberContainer num={notReadNum} />;
};

function countNotReadNum(datas: joinChatType[], type: string) {
  if (type === "Total") return datas.reduce((acc, cur) => acc + cur.notReadNum, 0);
  return datas.filter((data) => data.chatRoomId === Number(type))[0].notReadNum;
}
