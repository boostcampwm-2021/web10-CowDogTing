import { Router } from "express";
import { handleJoin, handleLogin, handleLogOut } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";

const authRouter = Router();
authRouter.post("/join", isNotLoggedIn, handleJoin);
authRouter.post("/login", isNotLoggedIn, handleLogin);
authRouter.get("/logout", isLoggedIn, handleLogOut);

export default authRouter;
