import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req, res) => {
  const uid = req.query.uid;
  console.log(uid);
  const data = await findChatRoomInfo({ uid }); //[chatroomId, member=[]]
  //[chatroomId,member=[],chatMessages[]]
  res.send(data);
};

export const getChatMessage = async (req, res) => {
  const chatRoomId = req.query.chatRoomId;
  const index = req.query.index;
  const data = await findMessages(chatRoomId, index);
  res.send(data);
};
