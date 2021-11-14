import { NextFunction, Request, Response } from "express";
import { findImage, findChatRoomNotReadNum, findAllRequest, findUserInfo, findAllProfile, updateUser } from "./service";

const defaultUser = {
  id: "",
  image: "",
  location: "",
  sex: "",
  age: 0,
  info: "",
  gid: null,
};

const defaultRequest = <any>[];
const defaultJoinChatRoom = {};

export const getImage = async (req: Request, res: Response) => {
  const imageID = String(req.query.imageID);
  const data = await findImage({ imageID });
  res.send(data);
};

export const getJoinChatInfo = async (req: Request, res: Response) => {
  if (!req.user) {
    res.send(defaultJoinChatRoom);
    return;
  }
  const uid = String(req.user.uid);
  const data = await findChatRoomNotReadNum({ uid });
  res.send(data);
};

export const getRequest = async (req: Request, res: Response) => {
  if (!req.user) {
    res.send(defaultRequest);
    return;
  }
  const uid = String(req.user.uid);
  const data = await findAllRequest({ uid });
  res.send(data);
};

export const getUserInfo = async (req: Request, res: Response) => {
  if (!req.user) {
    res.send(defaultUser);
    return;
  }
  const uid = String(req.user.uid);
  const data = await findUserInfo({ uid });
  res.send(data);
};

export const getProfile = async (req: Request, res: Response) => {
  const person: number = Number(req.query.person);
  const index: number = Number(req.query.index);
  const data = await findAllProfile(person, index);
  res.send(data);
};

export const postUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.send(defaultUser);
    return;
  }
  const oldId = String(req.user.uid);
  const { id: uid, location, age, info } = req.body;
  await updateUser(oldId, { uid, location, age, info });
  return res.send(true);
};
