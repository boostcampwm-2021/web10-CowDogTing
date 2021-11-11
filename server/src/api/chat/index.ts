import { Router } from "express";
import { getChatsInfo, getChatMessage } from "./controller";
import { isLoggedIn } from "../middlewares/isAuth";

const chatRouter = Router();

chatRouter.get("/info", getChatsInfo);
chatRouter.get("/messages", getChatMessage);

export default chatRouter;
