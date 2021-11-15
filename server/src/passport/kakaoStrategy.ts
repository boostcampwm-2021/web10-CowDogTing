import { Users } from "./../db/models/users";
import * as passport from "passport";
import * as passportKakao from "passport-kakao";

const kakaoStrategy = passportKakao.Strategy;

export default () => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        clientSecret: "iFwuehmUxUwt2lfdiCuHWRvKpu3zmqQb",
        callbackURL: "/api/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log("kakao profile", profile);
        try {
          const exUser = await Users.findOne({
            where: { kakao_id: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
