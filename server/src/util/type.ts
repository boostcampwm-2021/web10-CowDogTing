export type SendChatType = { chatRoomId: number; message: messageType };

export type messageType = {
  from: string;
  message?: string;
  read: boolean;
  source?: string;
};
