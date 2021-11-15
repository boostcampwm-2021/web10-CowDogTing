import { Router } from "express";
import { handleRegister, handleLogin, handleLogOut, handleIdValidation, handleNaverLogin, handleNaverCallback } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";

const authRouter = Router();
authRouter.post("/register", isNotLoggedIn, handleRegister);
authRouter.post("/login", isNotLoggedIn, handleLogin);
authRouter.get("/logout", isLoggedIn, handleLogOut);
authRouter.get("/id-validation", handleIdValidation);
authRouter.get("/naver", handleNaverLogin);
authRouter.get("/naver/callback", handleNaverCallback);

export default authRouter;
