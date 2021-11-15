import io, { Socket } from "socket.io-client";

export default class ClientSocket {
  socket: Socket | undefined;

  static instance: ClientSocket;

  constructor(id: string) {
    if (ClientSocket.instance) return this;
    this.connect();
    this.setUid(id);
  }

  connect() {
    this.socket = io(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`);
  }

  setUid(id: string) {
    this.socket?.emit("setUid", id);
  }

  addEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent }: { handleReceiveRequestEvent: any; handleReceiveDenyEvent: any; handleReceiveAcceptEvent: any; handleReceiveChatEvent: any }) {
    this.socket?.on("receiveRequest", handleReceiveRequestEvent);
    this.socket?.on("receiveDenyRequest", handleReceiveDenyEvent);
    this.socket?.on("receiveAcceptRequest", handleReceiveAcceptEvent);
    this.socket?.on("receiveChat", handleReceiveChatEvent);
  }

  deleteEvent({ handleReceiveRequestEvent, handleReceiveDenyEvent, handleReceiveAcceptEvent, handleReceiveChatEvent }: { handleReceiveRequestEvent: any; handleReceiveDenyEvent: any; handleReceiveAcceptEvent: any; handleReceiveChatEvent: any }) {
    this.socket?.off("receiveRequest", handleReceiveRequestEvent);
    this.socket?.off("receiveDenyRequest", handleReceiveDenyEvent);
    this.socket?.off("receiveAcceptRequest", handleReceiveAcceptEvent);
    this.socket?.off("receiveChat", handleReceiveChatEvent);
  }
}