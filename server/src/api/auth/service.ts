import { UserAttributes } from "./../../db/models/users";
import { Users } from "../../db/models/users";
import * as bcrypt from "bcrypt";

export const findUser = async ({ uid }: { uid: string }) => {
  return await Users.findOne({ where: { uid } });
};

export const createUser = async ({ uid, password, location, age, sex, info }: UserAttributes) => {
  const hash: string = await bcrypt.hash(password, 12);
  return await Users.create({
    uid,
    password: hash,
    location,
    github_id: null,
    naver_id: null,
    kakao_id: null,
    image: null,
    age,
    sex,
    gid: null,
    info,
  });
};

export const addKakaoID = async (kakao_id: string, uid: string) => {
  await Users.update({ kakao_id }, { where: { uid } });
};
export const addGithubID = async (github_id: string, uid: string) => {
  await Users.update({ github_id }, { where: { uid } });
};
export const addNaverID = async (naver_id: string, uid: string) => {
  await Users.update({ naver_id }, { where: { uid } });
};
