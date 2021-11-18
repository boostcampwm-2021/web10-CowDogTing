import "webrtc";

export type SendChatType = { chatRoomId: number; message: messageType };

export type messageType = {
  from: string;
  message?: string;
  read: boolean;
  source?: string;
};

export type receiverPCType = {
  [index: string]: RTCPeerConnection;
};
export type senderPCType = {
  [index: string]: { id: string; pc: RTCPeerConnection };
};
export type userType = { [index: string]: { id: string; stream: MediaStream } };

export type socketToRoomType = {
  [index: string]: string;
};
