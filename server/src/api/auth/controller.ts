import * as express from "express";
import * as passport from "passport";
import { findUser, createUser } from "./service";

export const handleJoin = async (req, res, next) => {
  const { uid, password, email, name, location, image, age, sex }: { uid: string; password: string; email: string; name: string; location: string; image: number; age: number; sex: string } = req.body;
  try {
    const exUser = await findUser({ uid });
    if (exUser) {
      return res.send({ test: "해당 아이디 존재" });
    }
    await createUser({ uid, password, location, image, age, sex });
    return res.send({ test: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const handleLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send({ test: "회원정보 불일치", info: [info] });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send({ test: "로그인 성공" });
    });
  })(req, res, next);
};

export const handleLogOut = (req, res) => {
  req.logout();
  req.session.destroy(() => {
    req.session;
  });
  res.send(true);
};
