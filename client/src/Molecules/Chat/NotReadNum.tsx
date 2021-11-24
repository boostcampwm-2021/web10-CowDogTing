import { useRecoilValue } from "recoil";
import RoundNumberContainer from "../../Atom/RoundNumberContainer";
import { joinChatRoomState } from "../../Recoil/Atom";
import { joinChatType } from "../../util/type";

export default function NotReadNum() {
  const datas = useRecoilValue(joinChatRoomState);
  const notReadNum = countNotReadNum(datas);
  return <RoundNumberContainer num={notReadNum} />;
}

function countNotReadNum(datas: joinChatType[]) {
  let num = 0;
  datas.forEach((data) => {
    num += data.notReadNum;
  });
  return num;
}
