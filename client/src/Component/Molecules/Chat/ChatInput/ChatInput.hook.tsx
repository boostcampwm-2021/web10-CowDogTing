import { useRef } from "react";
import ClientSocket from "Socket";

type chatRoomInfo = {
  uid: string;
  chatRoomId: number;
};

export const useChatMessageControl = ({ uid, chatRoomId }: chatRoomInfo) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const sendMessage = () => {
    if (!messageRef.current?.value) return;
    sendChat({ uid, chatRoomId, message: messageRef.current.value });
    messageRef.current.value = "";
  };
  return { messageRef, sendMessage };
};

type sendChatPropsType = chatRoomInfo & { message: string };
const sendChat = ({ uid, chatRoomId, message }: sendChatPropsType) => {
  const { socket } = new ClientSocket(uid);
  socket?.emit("sendChat", { chatRoomId, message: { from: uid, message, read: false, source: "" } });
};
