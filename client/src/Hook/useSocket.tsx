/* eslint-disable no-new */
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatTarget, errorState } from "../Recoil/Atom";
import { chatsState, joinChatRoomSelector, joinChatRoomState } from "../Recoil/ChatData";
import { requestState } from "../Recoil/RequestData";
import { userStateSelector } from "../Recoil/UserData";
import ClientSocket from "../Socket";
import { handleReceiveRequestSocket, handleReceiveDenySocket, handleReceiveAcceptSocket, handleReceiveChatSocket } from "../Socket/chatSocket";
import { RequestType, ChatInfoType, MessageType } from "../Common/type";

export const useSocketConnect = () => {
  const res = useRecoilValue(userStateSelector);
  const id = res?.id;
  const setRequest = useSetRecoilState(requestState);
  const setJoinChat = useSetRecoilState(joinChatRoomState);
  const joinChat = useRecoilValue(joinChatRoomSelector);
  const setChat = useSetRecoilState(chatsState);
  const setChatInfo = useSetRecoilState(chatTarget);
  const setErrorValue = useSetRecoilState(errorState);

  useEffect(() => {
    console.log(joinChat);
    if (id === "") return;
    const socket = new ClientSocket(id);

    const handleReceiveRequestEvent = (data: RequestType) => {
      handleReceiveRequestSocket({ setRequest, data });
      if (data.from === id) return;
      setErrorValue({ errorStr: "채팅 요청이 왔습니다.", timeOut: 1000 });
    };
    const handleReceiveDenyEvent = (data: { from: string; to: string }) => {
      handleReceiveDenySocket({ setRequest, data });
      if (data.from !== id) return;
      setErrorValue({ errorStr: `${data.to}님이 요청을 거절하셨습니다.`, timeOut: 1000 });
    };
    const handleReceiveAcceptEvent = (data: { chat: ChatInfoType; from: string; to: string }) => {
      handleReceiveAcceptSocket({ setRequest, setJoinChat, setChat, data });
      if (data.from !== id) return;
      setErrorValue({ errorStr: `${data.to}님이 요청을 승인하셨습니다.`, timeOut: 1000 });
    };
    const handleReceiveChatEvent = (data: { message: MessageType; chatRoomId: number }) => handleReceiveChatSocket({ setJoinChat, setChat, setChatInfo, data, setErrorValue });

    socket.addEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent, joinChat });
    return () => socket.deleteEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent });
  }, [joinChat]);

  useEffect(() => {
    if (id === "") return;
    new ClientSocket(id);
  }, [id]);
};
