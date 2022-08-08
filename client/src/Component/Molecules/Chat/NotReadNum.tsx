import { useRecoilValue } from "recoil";
import RoundNumberContainer from "../../Atom/RoundNumberContainer";
import { joinChatRoomState } from "../../../Recoil/Atom";
import { joinChatType } from "../../../util/type";

export default function NotReadNum({ type }: { type: string }) {
  const datas = useRecoilValue(joinChatRoomState);
  const notReadNum = countNotReadNum(datas, type);
  return <RoundNumberContainer num={notReadNum} />;
}

function countNotReadNum(datas: joinChatType[], type: string) {
  if (type === "Total") return datas.reduce((acc, cur) => acc + cur.notReadNum, 0);
  return datas.filter((data) => data.chatRoomId === Number(type))[0].notReadNum;
  // let num = 0;
  // datas.forEach((data) => {
  //   num += data.notReadNum;
  // });
  // return num;
}
