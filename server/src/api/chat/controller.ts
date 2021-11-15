import { Request, Response } from "express";
import { isUser } from "../middlewares/isUser";
import { findChatRoomInfo, findMessages } from "./service";

export const getChatsInfo = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ error: "로그인을 하지 않았습니다" });
  }
  const uid = String(req.user!.uid); // req.user as myuser User를 상속
  const data = await findChatRoomInfo({ uid });
  res.send(data);
};

export const getChatMessage = async (req: Request, res: Response) => {
  const chatRoomId = Number(req.query.chatRoomId);
  const index = Number(req.query.index);
  const data = await findMessages(chatRoomId, index);
  res.send(data);
};
