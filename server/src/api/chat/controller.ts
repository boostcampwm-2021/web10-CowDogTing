import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req, res) => {
  const uid = req.query.uid;
  console.log(uid);
  const data = await findChatRoomInfo({ uid }); //[chatroomId, member=[]]
  //[chatroomId,member=[],chatMessages[]]
  res.send(data);
};

export const getChatMessage = async (req, res) => {
  const chatRoomId = req.query.ChatRoomID;
  const data = await findMessages({ chatRoomId });
  res.send(data);
};
