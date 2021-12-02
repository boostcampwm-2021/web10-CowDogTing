/* eslint-disable no-console */
import io, { Socket } from "socket.io-client";
import { joinChatType } from "../util/type";

export default class ClientSocket {
  socket: Socket | undefined;

  static sendPC: RTCPeerConnection;

  static receivePCs: { [index: string]: RTCPeerConnection };

  static instance: ClientSocket;

  constructor(id: string) {
    if (ClientSocket.instance) return ClientSocket.instance;
    this.connect();
    ClientSocket.instance = this;
    this.setUid(id);
  }

  connect() {
    this.socket = io(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`, { transports: ["websocket"] });
  }

  setUid(id: string) {
    this.socket?.emit("setUid", id);
  }

  addEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent, joinChat }: { handleReceiveRequestEvent: any; handleReceiveDenyEvent: any; handleReceiveAcceptEvent: any; handleReceiveChatEvent: any; joinChat: joinChatType[] }) {
    this.socket?.on("receiveRequest", handleReceiveRequestEvent);
    this.socket?.on("receiveDenyRequest", handleReceiveDenyEvent);
    this.socket?.on("receiveAcceptRequest", handleReceiveAcceptEvent);
    this.socket?.on("receiveChat", handleReceiveChatEvent);
    const chatRoomID = joinChat.map((data: joinChatType) => String(data.chatRoomId));
    this.socket?.emit("joinChatRoom", chatRoomID);
  }

  deleteEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent }: { handleReceiveRequestEvent: any; handleReceiveDenyEvent: any; handleReceiveAcceptEvent: any; handleReceiveChatEvent: any }) {
    this.socket?.off("receiveRequest", handleReceiveRequestEvent);
    this.socket?.off("receiveDenyRequest", handleReceiveDenyEvent);
    this.socket?.off("receiveAcceptRequest", handleReceiveAcceptEvent);
    this.socket?.off("receiveChat", handleReceiveChatEvent);
  }
}
