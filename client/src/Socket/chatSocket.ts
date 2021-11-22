import { ChatInfoType, joinChatType, ReceiveAcceptSocketType, ReceiveChatSocketType, ReceiveDenySocketType, ReceiveRequestSocketType, RequestType } from "../util/type";

export const handleReceiveRequestSocket = ({ setRequest, data }: ReceiveRequestSocketType) => {
  setRequest((prev: RequestType[]) => [...prev, data]);
};

export const handleReceiveDenySocket = ({ setRequest, data }: ReceiveDenySocketType) => {
  setRequest((prev: RequestType[]) => prev.filter((item) => item.from !== data.from));
};

export const handleReceiveAcceptSocket = ({ setRequest, setJoinChat, setChat, data }: ReceiveAcceptSocketType) => {
  setRequest((prev: RequestType[]) => prev.filter((item) => item.from !== data.from));
  setJoinChat((prev: joinChatType[]) => [
    ...prev,
    {
      chatRoomId: data.chat.chatRoomId,
      notReadNum: 0,
    },
  ]);
  setChat((prev: ChatInfoType[]) => [...prev, data.chat]);
};

export const handleReceiveChatSocket = ({ setJoinChat, setChat, setChatInfo, data }: ReceiveChatSocketType) => {
  const { chatRoomId, message } = data;
  setJoinChat((prev: joinChatType[]) =>
    prev.map((item) => {
      if (item.chatRoomId === chatRoomId) {
        return {
          ...item,
          notReadNum: item.notReadNum + 1,
        };
      }
      return item;
    })
  );

  setChat((prev: ChatInfoType[]) =>
    prev.map((item) => {
      if (item.chatRoomId === chatRoomId) {
        return {
          ...item,
          chatMessage: [...item.chatMessage, message],
        };
      }
      return item;
    })
  );
  setChatInfo((prev: ChatInfoType) => {
    if (Number(chatRoomId) !== prev.chatRoomId) return prev;
    return {
      ...prev,
      chatMessage: [...prev.chatMessage, message],
    };
  });
};
