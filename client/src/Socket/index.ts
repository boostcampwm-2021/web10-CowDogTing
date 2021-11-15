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
}
