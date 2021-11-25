import { Request, Response, NextFunction } from "express";
import { createReadRow, findChatRoomsInfo, findMessages, findParticipants, handleMessageRead } from "./service";
import { app } from "../../app";
import { Participant } from "../../db/models/participant";
import { createChatMessage } from "../util";
export const getChatsInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).send({ error: "로그인을 하지 않았습니다" });
    const uid = String(req.user.uid);
    const data = await findChatRoomsInfo({ uid });
    res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const getChatMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatRoomId = Number(req.query.chatRoomId);
    const index = Number(req.query.index);
    const data = await findMessages(chatRoomId, index);
    res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const postChatMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, message, chatRoomId } = req.body;
    let message_obj;
    if (req.file) {
      message_obj = { from, message, source: "/" + req.file.path };
      const createdChatMessage = await createChatMessage({ chatRoomId, message: message_obj });
      await addReadRow({ chatId: createdChatMessage.chatId, chatRoomId, uid: from });
    }
    app.get("io").sockets.in(String(chatRoomId)).emit("receiveChat", { chatRoomId, message: message_obj });
    return res.send({ success: "성공" });
  } catch (err) {
    console.log(err);
  }
};

export const addReadRow = async ({ chatId, chatRoomId, uid }: { chatId: number; chatRoomId: number; uid: string }) => {
  const participants = await findParticipants({ chatRoomId });
  participants.forEach((participant: Participant) => {
    const isRead = participant.uid === uid ? true : false;
    createReadRow({ chatId, chatRoomId, uid: participant.uid, isRead });
  });
};

export const readChat = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ error: "로그인 되어 있지 않음" });
  }
  try {
    const { chatRoomId } = req.body;
    const uid = String(req.user.uid);
    console.log(chatRoomId, uid);
    await handleMessageRead({ uid, chatRoomId });
    return res.send({ success: "메시지 읽기 성공!!!" });
  } catch (error) {
    console.log(error);
  }
};
