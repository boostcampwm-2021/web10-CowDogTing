import { Router } from "express";
import { getJoinChatInfo, getRequest, getUserInfo, getProfile, postUserUpdate, postRequest, denyRequest, acceptRequest, postImage } from "./controller";
import * as path from "path";
import multer = require("multer");

import * as fs from "fs";
try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

export const upload = multer({
  storage: multer.diskStorage({
    destination(req: Express.Request, file: Express.Multer.File, done: (error: Error | null, destination: string) => void) {
      done(null, "uploads/");
    },
    filename(req: Express.Request, file: Express.Multer.File, done: (error: Error | null, destination: string) => void) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});
const coreRouter = Router();

coreRouter.get("/userInfo", getUserInfo);
coreRouter.get("/joinChatInfo", getJoinChatInfo);
coreRouter.get("/request", getRequest);
coreRouter.post("/postRequest", postRequest);
coreRouter.post("/denyRequest", denyRequest);
coreRouter.post("/acceptRequest", acceptRequest);
coreRouter.get("/profile", getProfile);
coreRouter.post("/userInfo", postUserUpdate);
coreRouter.post("/postImage", upload.single("image"), postImage);

export default coreRouter;
