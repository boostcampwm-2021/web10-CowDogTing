import { Users } from "../../../models/users";
import * as bcrypt from "bcrypt";

export const findUser = async ({ uid }) => {
  return await Users.findOne({ where: { uid } });
};

export const createUser = async ({ uid, password }) => {
  const hash: string = await bcrypt.hash(password, 12); // bcrypt의 첫 번째 인자는 암호화 대상, 두번 째 인자는 pbkdf2의 반복 횟수(숫자가 커질수록 비밀번호를 알아내기 어렵지만 암호화 시간도 오래걸린다. 보통 12이상을 추천)
  return await Users.create({
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
};
