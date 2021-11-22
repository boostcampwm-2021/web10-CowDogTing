import { Request, Response, NextFunction } from "express";
import { createChatMessage, findChatRoomsInfo, findMessages } from "./service";
import { app } from "../../app";
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
      message_obj = { from, message, read: false, source: "/" + req.file.path };
      await createChatMessage({ chatRoomId, message: message_obj });
    }
    app.get("io").sockets.in(String(chatRoomId)).emit("receiveChat", { chatRoomId, message: message_obj });
    return res.send({ success: "성공" });
  } catch (err) {
    console.log(err);
  }
};
