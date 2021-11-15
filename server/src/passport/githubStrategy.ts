import { Users } from "./../db/models/users";
import * as passport from "passport";
import * as passportGithub from "passport-github2";

const githubStrategy = passportGithub.Strategy;

export default () => {
  passport.use(
    new githubStrategy(
      {
        clientID: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
        callbackURL: process.env.GITHUB_CALLBACKURL!,
      },
      async (_: string, __: string, profile: passportGithub.Profile, done: (error: any, user?: any, info?: any) => void) => {
        try {
          const exUser = await Users.findOne({
            where: { github_id: profile.username },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            done(null, false, { message: "로컬 로그인 후 연동이 필요합니다." });
          }
        } catch (error: any) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
