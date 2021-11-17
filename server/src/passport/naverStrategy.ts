import * as passport from "passport";
import * as bcrypt from "bcrypt";
import { Users } from "../db/models/users";
var NaverStrategy = require("passport-naver").Strategy;
export default () => {
  passport.use(
    new NaverStrategy({ clientID: process.env.NAVER_CLIENTID, clientSecret: process.env.NAVER_CLIENTSECRET, callbackURL: process.env.NAVER_CALLBACKURL }, async (_: string, __: string, profile: any, done: (error: any, user?: any, info?: any) => void) => {
      try {
        console.log(profile);
        const exUser = await Users.findOne({
          where: { naver_id: profile.username },
        });
        if (exUser) {
          done(null, exUser);
        } else {
          done(null, false, profile.username);
        }
      } catch (error: any) {
        console.error(error);
        done(error);
      }
    }),
  );
};
