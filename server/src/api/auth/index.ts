import { Router } from "express";
import { handleRegister, handleLogin, handleLogOut, handleIdValidation, handleSocialLogin } from "./controller";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/isAuth";

const authRouter = Router();
authRouter.post("/register", isNotLoggedIn, handleRegister);
authRouter.post("/social", isNotLoggedIn, handleSocialLogin);
authRouter.post("/login", isNotLoggedIn, handleLogin);
authRouter.get("/logout", isLoggedIn, handleLogOut);
authRouter.get("/id-validation", handleIdValidation);

export default authRouter;
