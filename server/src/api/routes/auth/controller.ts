import * as express from "express";
import * as passport from "passport";
import * as bcrypt from "bcrypt";
import { Users } from "../../../models/users";
import { findUser } from "./service";

export const handleJoin = async (req, res, next) => {
  const { uid, password }: { uid: string; password: string } = req.body;
  try {
    const exUser = await findUser({ uid });
    if (exUser) {
      return res.send({ test: "해당 아이디 존재" });
    }
    const hash: string = await bcrypt.hash(password, 12); // bcrypt의 첫 번째 인자는 암호화 대상, 두번 째 인자는 pbkdf2의 반복 횟수(숫자가 커질수록 비밀번호를 알아내기 어렵지만 암호화 시간도 오래걸린다. 보통 12이상을 추천)
    await Users.create({
      uid,
      password: hash,
      email: "",
      name: "",
      location: "",
      github_id: "",
      naver_id: "",
      kakao_id: "",
      image: "",
      age: 25,
      sex: "",
      gid: 1,
    });
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
