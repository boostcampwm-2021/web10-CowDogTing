import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import coreRouter from "./core";
import teamRouter from "./team";

const router = Router();

router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/team", teamRouter);
router.use("/core", coreRouter);

export default router;
