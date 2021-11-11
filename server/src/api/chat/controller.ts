import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req, res) => {
  if (!req.user) {
    res.send({ error: "로그인을 하지 않았습니다" });
    return;
  }
  const { uid } = req.user;
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
