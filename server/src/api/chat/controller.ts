import { Request, Response } from "express";
import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req: Request, res: Response) => {
  if (!req.user) {
    res.send({ error: "로그인을 하지 않았습니다" });
    return;
  }
  const uid = String(req.user.uid);
  // const { uid } = req.user;
  console.log(uid);
  const data = await findChatRoomInfo({ uid }); //[chatroomId, member=[]]
  //[chatroomId,member=[],chatMessages[]]
  res.send(data);
};

export const getChatMessage = async (req: Request, res: Response) => {
  const chatRoomId = Number(req.query.chatRoomId);
  const index = Number(req.query.index);
  const data = await findMessages(chatRoomId, index);
  res.send(data);
};
