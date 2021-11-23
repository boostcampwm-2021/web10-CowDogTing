import { NextFunction, Request, RequestParamHandler, Response } from "express";
import path = require("path");
import { findChatRoomNotReadNum, findAllRequest, findUserInfo, findAllProfile, updateUser, sendRequest, validationTeamAndUser, _denyRequest, _acceptRequest, addRequest, updateProfileImage, findAllTeamRequest } from "./service";

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
export const postImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).send({ error: "로그인 안됨" });
  const { id } = req.body;
  if (!req.file) return res.status(404).send({ eeror: "잘못된 이미지입니다" });
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

export const getRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send(defaultRequest);
    const uid = String(req.user.uid);
    const gid = Number(req.user.gid);
    const userData = await findAllRequest({ uid });
    const data = await findAllTeamRequest({ uid, gid, userData });
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const postRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(402).send({ error: "isn`t Login" });
    const { from, to } = req.body;
    const toValidation = await validationTeamAndUser(to);
    if (!toValidation) return res.status(403).send({ error: "to isn`t exist" });
    await addRequest({ from, to });
    console.log(3);
    sendRequest({ from, to });
    return res.status(200).send(true);
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
    if (!req.user) return res.status(401).send(defaultUser);
    const myId = String(req.user.uid);
    const data = await findAllProfile(person, index, myId);
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

export const denyRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send({ error: "isn`t login" });
    const { from, to } = req.body;
    const toValidation = await validationTeamAndUser(to);
    if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
    _denyRequest({ from, to });
    return res.status(200).send(true);
  } catch (error) {
    return next(error);
  }
};

export const acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user);
    if (!req.user) return res.send({ error: "isn`t login" });
    const { from, to } = req.body;
    console.log(from, to);
    const toValidation = await validationTeamAndUser(to);
    console.log(toValidation);
    if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
    _acceptRequest({ from, to });
    return res.status(200).send(true);
  } catch (error) {
    return next(error);
  }
};
