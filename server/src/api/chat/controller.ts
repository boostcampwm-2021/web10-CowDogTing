import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req, res) => {
  const uid = req.user.uid;
  const data = await findChatRoomInfo({ uid });
  res.send(data);
};

export const getChatMessage = async (req, res) => {
  const chatRoomId = req.query.ChatRoomID;
  const data = await findMessages({ chatRoomId });
  res.send(data);
};
