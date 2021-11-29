import { Chat } from "../db/models/chat";
import { Users } from "../db/models/users";
import { SendChatType } from "../util/type";

export const findUser = async ({ uid }: { uid: string }) => {
  try {
    return await Users.findOne({ where: { uid } });
  } catch (e) {
    return false;
  }
};

export const createChatMessage = async ({ chatRoomId, message }: SendChatType) => {
  const createdChatMessage = await Chat.create({ uid: message.from, message: message.message, src: message.source, chatRoomId });
  return createdChatMessage;
};
