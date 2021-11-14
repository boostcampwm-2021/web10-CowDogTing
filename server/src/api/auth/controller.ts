import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import { findUser, createUser } from "./service";

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { uid, password, location, age, sex }: { uid: string; password: string; location: string; age: number; sex: string } = req.body;
  try {
    const exUser = await findUser({ uid });
    if (exUser) {
      return res.send({ test: "해당 아이디 존재" });
    }
    await createUser({ uid, password, location, age, sex });
    return res.send({ test: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send(false);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send(true);
    });
  })(req, res, next);
};

export const handleLogOut = (req: Request, res: Response) => {
  req.logout();
  req.session.destroy(() => {
    req.session;
  });
  res.send(true);
};

export const handleIdValidation = async (req: Request, res: Response, next: NextFunction) => {
  const uid = String(req.query.uid);
  try {
    const result = await findUser({ uid });
    if (result) {
      res.send(true);
    }
    if (!result) {
      res.send(false);
    }
  } catch (e) {
    next(e);
  }
};
