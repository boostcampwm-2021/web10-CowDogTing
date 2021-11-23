import "webrtc";

export type SendChatType = { chatRoomId: number; message: messageType };

export type messageType = {
  from: string;
  message?: string;
  read: boolean;
  source?: string | null;
};

export type receiverPCType = {
  [index: string]: RTCPeerConnection;
};
export type senderPCsType = {
  [index: string]: senderPCType[];
};
export type senderPCType = {
  id: string;
  pc: RTCPeerConnection;
};
export type userType = { id: string; stream: MediaStream };

export type usersType = { [index: string]: userType[] };
export type socketToRoomType = {
  [index: string]: string;
};
