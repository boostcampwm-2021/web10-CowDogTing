import * as passport from "passport";
import { findUser, createUser } from "./service";

export const handleRegister = async (req, res, next) => {
  const { uid, password, location, age, sex }: { uid: string; password: string; location: string; age: number; sex: string } = req.body;
  console.log(uid, password, location, age, sex);
  try {
    const exUser = await findUser({ uid });
    if (exUser) {
      console.log("해당 아이디 존재");
      return res.send({ test: "해당 아이디 존재" });
    }
    await createUser({ uid, password, location, age, sex });
    console.log("test : 실패");
    res.send({ test: "회원가입 성공" });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.redirect("http://localhost:3000");
  } catch (error) {
    console.log("test : 회원가입실패");
    res.send({ test: "회원가입 실패" });
    return next(error);
  }
};

export const handleLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.send({ test: "회원정보 불일치", info: [info] });
    }
    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      req.session.save(() => {
        res.send({ f: "wiw" });
      });
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
