import { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { postChat } from "@Util/data";
import ClientSocket from "@Socket/.";

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
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;
    sendMessage();
  };
  return { messageRef, sendMessage, handleEnterPress };
};

type sendChatPropsType = chatRoomInfo & { message: string };
const sendChat = ({ uid, chatRoomId, message }: sendChatPropsType) => {
  const { socket } = new ClientSocket(uid);
  socket?.emit("sendChat", { chatRoomId, message: { from: uid, message, read: false, source: "" } });
};

export const useChatImageControl = ({ uid, chatRoomId }: chatRoomInfo) => {
  const imageInputTag = useRef<HTMLInputElement>(null);
  const handleImageButtonClick = () => (imageInputTag.current as HTMLInputElement).click();

  const changeImage: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    postChat(chatRoomId, uid, event.target.files[0]);
  };

  return { imageInputTag, handleImageButtonClick, changeImage };
};
