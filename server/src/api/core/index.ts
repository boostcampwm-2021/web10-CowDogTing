import { Router } from "express";
import { getImage, getJoinChatInfo, getRequest, getUserInfo, getProfile } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";
const coreRouter = Router();

coreRouter.get("/image", getImage);
coreRouter.get("/userInfo", isLoggedIn, getUserInfo);
coreRouter.get("/joinChatInfo", getJoinChatInfo);
coreRouter.get("/request", getRequest);
coreRouter.get("/profile", getProfile);

export default coreRouter;
