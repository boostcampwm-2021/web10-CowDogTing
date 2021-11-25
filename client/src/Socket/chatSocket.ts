import { ChatInfoType, joinChatType, ReceiveAcceptSocketType, ReceiveChatSocketType, ReceiveDenySocketType, ReceiveRequestSocketType, RequestType } from "../util/type";

export const handleReceiveRequestSocket = ({ setRequest, data }: ReceiveRequestSocketType) => {
  setRequest((prev: RequestType[]) => [...prev, data]);
};

export const handleReceiveDenySocket = ({ setRequest, data }: ReceiveDenySocketType) => {
  setRequest((prev: RequestType[]) =>
    prev.filter((item) => {
      return item?.from !== data.from;
    })
  );
};

export const handleReceiveAcceptSocket = ({ setRequest, setJoinChat, setChat, data }: ReceiveAcceptSocketType) => {
  setRequest((prev: RequestType[]) =>
    prev.filter((item) => {
      return item.to !== data.to;
    })
  );
  setJoinChat((prev: joinChatType[]) => [
    ...prev,
    {
      chatRoomId: data.chat.chatRoomId,
      notReadNum: 0,
    },
  ]);
  setChat((prev: ChatInfoType[]) => [...prev, data.chat]);
};

export const handleReceiveChatSocket = ({ setJoinChat, setChat, setChatInfo, data, setErrorValue }: ReceiveChatSocketType) => {
  const { chatRoomId, message } = data;
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

  setChat((prev: ChatInfoType[]) =>
    prev.map((item) => {
      if (item.chatRoomId !== Number(chatRoomId)) return item;
      return {
        ...item,
        chatMessage: [...item.chatMessage, message],
      };
    })
  );

  if (targetRoomId === Number(chatRoomId)) return;
  setErrorValue({ errorStr: `${message.from}님에게 채팅이 왔습니다.`, timeOut: 1000 });
};
