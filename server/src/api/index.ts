import { Router } from "express";
import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import coreRouter from "./routes/core";
import teamRouter from "./routes/team";

const router = Router();
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/team", teamRouter);
router.use("/core", coreRouter);
router.use("/profile");
router.use("/request/info");

export default router;
