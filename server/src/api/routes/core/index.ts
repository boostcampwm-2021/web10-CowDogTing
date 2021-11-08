import { Router } from "express";
const coreRouter = Router();

coreRouter.get("/image");
coreRouter.get("/userInfo");
coreRouter.get("/joinChatInfo");

export default coreRouter;
