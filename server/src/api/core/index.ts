import { Router } from "express";
import { getImage, getJoinChatInfo, getRequest, getUserInfo, getProfile, postUserUpdate } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";
const coreRouter = Router();

coreRouter.get("/image", getImage);
coreRouter.get("/userInfo", getUserInfo);
coreRouter.get("/joinChatInfo", getJoinChatInfo);
coreRouter.get("/request", getRequest);
coreRouter.get("/profile", getProfile);
coreRouter.post("/userInfo", postUserUpdate);

export default coreRouter;
