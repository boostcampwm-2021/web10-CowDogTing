import { useRecoilValue } from "recoil";
import { chatTarget } from "@Recoil/Atom";
import { useMovePage } from "@Hook/useMovePage";
import { useGetParams } from "@Hook/useGetParams";

export const useHandleCloseRoom = () => {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const checkIndex = useGetParams("index");
  const [goBack, goChatList] = useMovePage([`/ChatRoom?chatRoomId=${chatRoomId}`, "/chatList"]);
  const handleCloseRoomClick = () => (checkIndex ? goBack() : goChatList());
  return handleCloseRoomClick;
};
