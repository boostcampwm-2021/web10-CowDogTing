// import { Users } from "./../db/models/users";
// import * as passport from "passport";
// import * as passportKakao from "passport-kakao";

// const kakaoStrategy = passportKakao.Strategy;

// export default () => {
//   passport.use(
//     new kakaoStrategy(
//       {
//         clientID: process.env.KAKAO_ID!,
//         clientSecret: process.env.KAKAO_SECRET!,
//         callbackURL: process.env.KAKAO_CALLBACKURL!,
//       },
//       async (_: string, __: string, profile: passportKakao.Profile, done: (error: any, user?: any, info?: any) => void) => {
//         try {
//           const exUser = await Users.findOne({
//             where: { kakao_id: profile._json.kakao_account.email },
//           });
//           if (exUser) {
//             done(null, exUser);
//           } else {
//             done(null, false, profile._json.kakao_account.email);
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       },
//     ),
//   );
// };
