import * as passport from "passport";
import local from "./localStrategy";
import { Users } from "../db/models/users";

export default () => {
  passport.serializeUser((user: Users, done) => {
    console.log("in the serial");
    // 로그인 시 실행, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드
    return done(null, user.uid); // 일단은 사용자 정보가 들어있다고 생각, 첫 번째 인수는 에러 발생시 사용, 두 번째 인수에는 저장하고 싶은 데이터를 넣는다.
  });

  passport.deserializeUser((uid, done) => {
    // 매 요청시 실행, passport.session 미들웨어가 이 메서드를 호출, serializeUser의 done 메서드의 두번째 인수로 넣었던 데이터가 deserializeUser의 매개변수가 된다.
    Users.findOne({ where: { uid } }) // 데이터베이스에서  사용자 정보 조회
      .then((user) => done(null, user)) // 조회한 정보를 req.user에 저장
      .catch((err) => done(err));
  });
  local();
};
