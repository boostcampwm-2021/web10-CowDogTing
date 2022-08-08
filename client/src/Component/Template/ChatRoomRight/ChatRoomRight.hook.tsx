import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { chatTarget } from "@Recoil/Atom";

export const useHandleCloseRoom = () => {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const searchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const handleCloseRoomClick = () => {
    const isGameIn = Number(searchParams.get("index"));
    if (!isGameIn) navigate("/sub/chatList");
    else navigate(`/ChatRoom?chatRoomId=${chatRoomId}`);
  };

  return handleCloseRoomClick;
};
