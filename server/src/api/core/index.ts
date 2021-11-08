import { Router } from "express";
import { getImage, getUserInfo, getJoinChatInfo } from "./controller";
const coreRouter = Router();

coreRouter.get("/image", getImage);
coreRouter.get("/userInfo", getUserInfo);
coreRouter.get("/joinChatInfo", getJoinChatInfo);

export default coreRouter;
