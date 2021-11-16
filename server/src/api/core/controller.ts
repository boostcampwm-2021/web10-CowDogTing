import { NextFunction, Request, Response } from "express";
import { findUser } from "../auth/service";
import { isUser } from "../middlewares/isUser";
import { findImage, findChatRoomNotReadNum, findAllRequest, findUserInfo, findAllProfile, updateUser, sendRequest, validationTeamAndUser, _denyRequest, _acceptRequest, addRequest } from "./service";

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
  return res.send(data);
};

export const getJoinChatInfo = async (req: Request, res: Response) => {
  if (!req.user) return res.send(defaultJoinChatRoom);
  const uid = String(req.user!.uid);
  const data = await findChatRoomNotReadNum({ uid });
  return res.send(data);
};

export const getRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.send(defaultRequest);
  const uid = String(req.user.uid);
  const data = await findAllRequest({ uid });
  return res.send(data);
};

export const postRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).send({ error: "isn`t Login" });
  const { from, to } = req.body;
  const toValidation = await validationTeamAndUser(to);
  console.log(toValidation);
  if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
  await addRequest({ from, to });
  sendRequest({ from, to });
  return res.status(200).send(true);
};

export const getUserInfo = async (req: Request, res: Response) => {
  if (!req.user) return res.send(defaultUser);
  const uid = String(req.user.uid);
  const data = await findUserInfo({ uid });
  return res.send(data);
};

export const getProfile = async (req: Request, res: Response) => {
  const person: number = Number(req.query.person);
  const index: number = Number(req.query.index);
  console.log(req.user);
  if (!req.user) return res.status(401).send(defaultUser);
  const myId = String(req.user.uid);
  const data = await findAllProfile(person, index, myId);
  console.log(data);
  return res.send(data);
};

export const postUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.send(defaultUser);
  const oldId = String(req.user!.uid);
  const { id: uid, location, age, info } = req.body;
  await updateUser(oldId, { uid, location, age, info });
  return res.status(200).send(true);
};

export const denyRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.send({ error: "isn`t login" });
  const { from, to } = req.body;
  const toValidation = await validationTeamAndUser(to);
  if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
  _denyRequest({ from, to });
  return res.status(200).send(true);
};

export const acceptRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.send({ error: "isn`t login" });
  const { from, to } = req.body;
  const toValidation = await validationTeamAndUser(to);
  if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
  _acceptRequest({ from, to });
  return res.status(200).send(true);
};
