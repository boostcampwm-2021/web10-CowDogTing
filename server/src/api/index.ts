import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import coreRouter from "./core";
import teamRouter from "./team";
import requestRouter from "./request";
import { isLoggedIn } from "./middlewares/isAuth";

const router = Router();

router.use("/auth", authRouter);
router.use("/chat", isLoggedIn, chatRouter);
router.use("/team", isLoggedIn, teamRouter);
router.use("/core", isLoggedIn, coreRouter);
router.use("/request", isLoggedIn, requestRouter);

export default router;
