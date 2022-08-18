import { ChatInfoType, joinChatType, MessageType, RequestType } from "../Common/type";

type ReceiveRequestSocketType = {
  setRequest: Function;
  data: RequestType;
};
type ReceiveDenySocketType = {
  setRequest: Function;
  data: { from: string; to: string };
};
type ReceiveAcceptSocketType = {
  setRequest: Function;
  setJoinChat: Function;
  setChat: Function;
  data: {
    chat: ChatInfoType;
    from: string;
    to: string;
  };
};

export type ReceiveChatSocketType = {
  setJoinChat: any;
  setChat: any;
  setChatInfo: any;
  setErrorValue: Function;
  data: {
    message: MessageType;
    chatRoomId: number;
  };
};

export const handleReceiveRequestSocket = ({ setRequest, data }: ReceiveRequestSocketType) => setRequest((prev: RequestType[]) => [...prev, data]);

export const handleReceiveDenySocket = ({ setRequest, data }: ReceiveDenySocketType) => setRequest((prev: RequestType[]) => prev.filter((item) => item?.from !== data.from));

export const handleReceiveAcceptSocket = ({ setRequest, setJoinChat, setChat, data }: ReceiveAcceptSocketType) => {
  setChat((prev: ChatInfoType[]) => [...prev, data.chat]);
  setRequest((prev: RequestType[]) => prev.filter((item) => item.to !== data.to));
  setJoinChat((prev: joinChatType[]) => [
    ...prev,
    {
      chatRoomId: data.chat.chatRoomId,
      notReadNum: 0,
    },
  ]);
};

export const handleReceiveChatSocket = ({ setJoinChat, setChat, setChatInfo, data: { chatRoomId, message }, setErrorValue }: ReceiveChatSocketType) => {
  let targetRoomId: number = 0;
  setChatInfo((prev: ChatInfoType) => {
    targetRoomId = prev.chatRoomId;
    if (Number(chatRoomId) !== prev.chatRoomId) return prev;
    return {
      ...prev,
      chatMessage: [...prev.chatMessage, message],
    };
  });

  setJoinChat((prev: joinChatType[]) =>
    prev.map((item) => {
      if (item.chatRoomId !== Number(chatRoomId)) return item;
      if (targetRoomId === Number(chatRoomId)) return item;
      return {
        ...item,
        notReadNum: item.notReadNum + 1,
      };
    })
  );

  setChat((prev: ChatInfoType[]) => prev.map((item) => (item.chatRoomId !== Number(chatRoomId) ? item : { ...item, chatMessage: [...item.chatMessage, message] })));

  if (targetRoomId === Number(chatRoomId)) return;
  setErrorValue({ errorStr: `${message.from}님에게 채팅이 왔습니다.`, timeOut: 1000 });
};
