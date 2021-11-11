import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import coreRouter from "./core";
import teamRouter from "./team";

const router = Router();
// const goMain = (req, res) => {
//   res.redirect("http://localhost:3000");
// };
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/team", teamRouter);
router.use("/core", coreRouter);
// router.get("/redirect", goMain);

//router.use("/profile");
//router.use("/request/info");

export default router;
