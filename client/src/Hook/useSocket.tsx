/* eslint-disable no-new */
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getFetch } from "@Common/api";
import { JOIN_CHAT_URL, USER_URL } from "@Common/URL";
import { chatTarget, errorState } from "../Recoil/Atom";
import { chatsState, joinChatRoomState } from "../Recoil/ChatData";
import { requestState } from "../Recoil/RequestData";
import { userState } from "../Recoil/UserData";
import ClientSocket from "../Socket";
import { handleReceiveRequestSocket, handleReceiveDenySocket, handleReceiveAcceptSocket, handleReceiveChatSocket } from "../Socket/chatSocket";
import { RequestType, ChatInfoType, MessageType } from "../Common/type";

export const useSocketConnect = () => {
  const [user, setUser] = useRecoilState(userState);
  const id = user?.id;
  const setRequest = useSetRecoilState(requestState);
  const [joinChat, setJoinChat] = useRecoilState(joinChatRoomState);
  const setChat = useSetRecoilState(chatsState);
  const setChatInfo = useSetRecoilState(chatTarget);
  const setErrorValue = useSetRecoilState(errorState);

  useEffect(() => {
    if (id === "") getFetch({ url: USER_URL, query: "" }).then((res) => setUser(res));
  }, [id]);

  useEffect(() => {
    if (joinChat.length === 0) getFetch({ url: JOIN_CHAT_URL, query: "" }).then((res) => setJoinChat(res));
  }, [joinChat]);
  useEffect(() => {
    if (joinChat.length === 0) return;
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
  }, [joinChat, id]);

  useEffect(() => {
    if (id === "") return;
    new ClientSocket(id);
  }, [id]);
};
