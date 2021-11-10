import * as passport from "passport";
import { findUser, createUser } from "./service";

export const handleRegister = async (req, res, next) => {
  const { uid, password, location, age, sex }: { uid: string; password: string; location: string; age: number; sex: string } = req.body;
  try {
    const exUser = await findUser({ uid });
    if (exUser) {
      return res.status(400).send({ test: "해당 아이디 존재" });
    }
    await createUser({ uid, password, location, age, sex });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.redirect("http://localhost:3000");
  } catch (error) {
    res.status(400).send({ test: "회원가입 실패" });
    return next(error);
  }
};

export const handleLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.status(400).send({ test: "회원정보 불일치", info: [info] });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      // res.redirect("/api/redirect");
      return res.send({ f: "wiw" });
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

export const handleIdValidation = async (req, res, next) => {
  const uid = req.qeury.uid;
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
