import * as passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
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
  kakao();
};
