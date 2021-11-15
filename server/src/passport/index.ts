import * as passport from "passport";
import local from "./localStrategy";
<<<<<<< HEAD
import naver from "./naverStrategy";
=======
import kakao from "./kakaoStrategy";
import github from "./githubStrategy";
>>>>>>> ef0a78fd4f8516be0f386d8d06a120e36d273ed1
import { Users } from "../db/models/users";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  passport.deserializeUser((uid, done) => {
    Users.findOne({ where: { uid } })
      .then((user: any) => done(null, user))
      .catch((err) => done(err));
  });
  local();
<<<<<<< HEAD
  naver();
=======
  kakao();
  github();
>>>>>>> ef0a78fd4f8516be0f386d8d06a120e36d273ed1
};
