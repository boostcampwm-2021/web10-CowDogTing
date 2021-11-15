import { RefObject } from "react";
import { ChatInfoType, joinChatType, PersonInfoType, ReceiveAcceptSocketType, ReceiveChatSocketType, ReceiveDenySocketType, ReceiveRequestSocketType, RequestType } from "./type";

export const handleModalClick = (e: React.MouseEvent, refs: RefObject<HTMLDivElement[]>, handler: (value: any) => void) => {
  if (!refs.current) {
    handler(null);
    return;
  }

  const target: HTMLElement = e.target as HTMLElement;

  const clickCard = refs.current
    .map((ref) => {
      if (!ref) return null;
      if (ref.contains(target)) return ref;
      return null;
    })
    .filter((ref) => ref)[0];
  if (!clickCard) {
    handler(null);

    return;
  }

  const { id } = clickCard.dataset;

  handler((prev: number) => (prev === Number(id) ? null : Number(id)));
};

export const passToLoginPage = () => {
  window.location.href = "/sub/login";
};

export const checkLogin = (userInfo: PersonInfoType) => {
  return userInfo.id !== "";
};

export const handleReceiveRequestSocket = ({ setRequest, data }: ReceiveRequestSocketType) => {
  setRequest((prev: RequestType[]) => [...prev, data]);
};

export const handleReceiveDenySocket = ({ setRequest, data }: ReceiveDenySocketType) => {
  setRequest((prev: RequestType[]) => {
    return prev.filter((item) => item.from !== data.from);
  });
};

export const handleReceiveAcceptSocket = ({ setRequest, setJoinChat, setChat, data }: ReceiveAcceptSocketType) => {
  setRequest((prev: RequestType[]) => {
    return prev.filter((item) => item.from !== data.from);
  });
  setJoinChat((prev: joinChatType[]) => [
    ...prev,
    {
      chatRoomId: data.chat.chatRoomId,
      notReadNum: 0,
    },
  ]);
  setChat((prev: ChatInfoType[]) => [...prev, data.chat]);
};

export const handleReceiveChatSocket = ({ setJoinChat, setChat, data }: ReceiveChatSocketType) => {
  setJoinChat((prev: joinChatType[]) => [
    ...prev,
    {
      chatRoomId: data.chatRoomId,
      notReadNum: 0,
    },
  ]);
  setChat((prev: ChatInfoType[]) => [...prev, data]);
};
