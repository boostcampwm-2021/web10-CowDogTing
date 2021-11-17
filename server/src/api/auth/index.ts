import { Router } from "express";
import { handleRegister, handleLogin, handleLogOut, handleIdValidation, handleNaverLogin, handleNaverCallback, handleKakaoLogin, handleKakaoCallback, handleGithubCallback, handleGithubLogin } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";

const authRouter = Router();
authRouter.post("/register", isNotLoggedIn, handleRegister);
authRouter.post("/login", isNotLoggedIn, handleLogin);
authRouter.get("/logout", isLoggedIn, handleLogOut);
authRouter.get("/id-validation", handleIdValidation);
authRouter.get("/naver", handleNaverLogin);
authRouter.get("/naver/callback", handleNaverCallback);
authRouter.get("/kakao", handleKakaoLogin);
authRouter.get("/kakao/callback", handleKakaoCallback);
authRouter.get("/github", handleGithubLogin);
authRouter.get("/github/callback", handleGithubCallback);

export default authRouter;
