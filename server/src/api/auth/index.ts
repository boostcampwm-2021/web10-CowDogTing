import { Request, Response, Router } from "express";
import { handleRegister, handleLogin, handleLogOut, handleIdValidation, handleKakaoLogin, handleKakaoCallback, handleGithubCallback, handleGithubLogin } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";

const authRouter = Router();
authRouter.post("/register", isNotLoggedIn, handleRegister);
authRouter.post("/login", isNotLoggedIn, handleLogin);
authRouter.get("/logout", isLoggedIn, handleLogOut);
authRouter.get("/id-validation", handleIdValidation);
authRouter.get("/kakao", handleKakaoLogin);
authRouter.get("/kakao/callback", handleKakaoCallback);
authRouter.get("/github", handleGithubLogin);
authRouter.get("/github/callback", handleGithubCallback, (req: Request, res: Response) => {
  res.redirect("http://localhost:3000/main");
});

export default authRouter;
