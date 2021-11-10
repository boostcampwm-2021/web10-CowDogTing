import { Router } from "express";
import { getChatsInfo, getChatMessage } from "./controller";

const chatRouter = Router();

chatRouter.get("/info", getChatsInfo);
chatRouter.get("/messages", getChatMessage);

export default chatRouter;
