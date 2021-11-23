import { Router } from "express";
import { getChatMessage, getChatsInfo, postChatMessage } from "./controller";
const multer = require("multer");
import * as fs from "fs";
import * as path from "path";

const chatRouter = Router();

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

chatRouter.get("/info", getChatsInfo);
chatRouter.get("/messages", getChatMessage);
chatRouter.post("/postChat", upload.single("image"), postChatMessage);

export default chatRouter;
