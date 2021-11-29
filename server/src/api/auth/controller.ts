import * as passport from "passport";
import { NextFunction, Request, Response } from "express";
import { createUser, addKakaoID, addGithubID, addNaverID } from "./service";
import { findUser } from "../util";

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, password, location, age, sex, info }: { uid: string; password: string; location: string; age: number; sex: string; info: string } = req.body;
    const exUser = await findUser({ uid });
    if (exUser) {
      return res.status(401).send({ error: "해당 아이디 존재" });
    }
    await createUser({ uid, password, location, age, sex, info });
    return res.status(200).send({ success: "회원가입 성공" });
  } catch (error) {
    return next(error);
  }
};

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.status(401).send(false);
    }
    if (req.session.kakao) {
      addKakaoID(String(req.session.kakao), user.uid);
      delete req.session.kakao;
    }
    if (req.session.github) {
      addGithubID(String(req.session.github), user.uid);
      delete req.session.github;
    }
    if (req.session.naver) {
      addNaverID(String(req.session.naver), user.uid);
      delete req.session.naver;
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.status(200).send(true);
    });
  })(req, res, next);
};

export const handleNaverLogin = passport.authenticate("naver");
export const handleNaverCallback = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("naver", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      req.session.naver = info;
      return res.redirect(303, String(process.env.CLIENT_NAVER_URL));
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect(302, String(process.env.CLIENT_MAIN_URL));
    });
  })(req, res, next);

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
      return res.send(false);
    }
    return res.send(true);
  } catch (e) {
    next(e);
  }
};

export const handleKakaoLogin = passport.authenticate("kakao");

export const handleKakaoCallback = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("kakao", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      req.session.kakao = info;
      return res.redirect(303, String(process.env.CLIENT_KAKAO_URL));
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect(302, String(process.env.CLIENT_MAIN_URL));
    });
  })(req, res, next);

export const handleGithubLogin = passport.authenticate("github", { scope: ["user:email"] });

export const handleGithubCallback = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("github", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      req.session.github = info;
      return res.redirect(303, String(process.env.CLIENT_GITHUB_URL));
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect(302, String(process.env.CLIENT_MAIN_URL));
    });
  })(req, res, next);
