import { NextFunction, Request, Response } from "express";
import { findChatRoomNotReadNum, findUserInfo, findAllProfile, updateProfileImage, updateUser } from "./service";
import { Op } from "sequelize";

const defaultUser = {
  id: "",
  image: "",
  location: "",
  sex: "",
  age: 0,
  info: "",
  gid: null,
};

const defaultJoinChatRoom = {};
export const postImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).send({ error: "로그인 안됨" });
  const { id } = req.body;
  if (!req.file) return res.status(404).send({ error: "잘못된 이미지입니다" });
  const imagePath = "/" + req.file?.path;
  const result = await updateProfileImage({ image: imagePath, id });
  if (!result) res.send({ error: "이미지 업로드 실패" });
  return res.send(imagePath);
  //const data = await addProfileImage
};

export const getJoinChatInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send(defaultJoinChatRoom);
    const uid = String(req.user!.uid);
    const data = await findChatRoomNotReadNum({ uid });
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send(defaultUser);
    const uid = String(req.user.uid);
    const data = await findUserInfo({ uid });
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const person: number = Number(req.query.person);
    const index: number = Number(req.query.index);
    const age = req.query.age ? Number(req.query.age) : { [Op.ne]: null };
    const sex = req.query.sex ? String(req.query.sex) : { [Op.ne]: null };
    const location = req.query.location ? String(req.query.location) : { [Op.ne]: null };
    if (!req.user) return res.status(401).send(defaultUser);
    const myId = String(req.user.uid);
    const data = await findAllProfile(person, index, myId, age, sex, location);
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const postUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send(defaultUser);
    const oldId = String(req.user!.uid);
    const { id: uid, location, age, info } = req.body;
    await updateUser(oldId, { uid, location, age, info });

    return res.status(200).send(true);
  } catch (error) {
    return next(error);
  }
};
