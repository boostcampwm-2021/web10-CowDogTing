import { Router } from "express";
import { getImage, getJoinChatInfo, getNewMsg, getRequest } from "./controller";
const coreRouter = Router();

coreRouter.get("/image", getImage);
coreRouter.get("/newMsgNum", getNewMsg);
//coreRouter.get("/userInfo", getUserInfo);
coreRouter.get("/joinChatInfo", getJoinChatInfo);
coreRouter.get("/request", getRequest);

export default coreRouter;
