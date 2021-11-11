import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";
import { Users } from "../db/models/users";

const LocalStrategy = passportLocal.Strategy;
export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "uid",
        passwordField: "password",
      },
      async (uid, password, done) => {
        try {
          const exUser = await Users.findOne({ where: { uid } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            // const result = password === exUser.password;
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
