import { NextFunction, Request, Response } from "express";
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

export const getImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageID = String(req.query.imageID);
    const data = await findImage({ imageID });
    return res.send(data);
  } catch (error) {
    return next(error);
  }
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
    const data = await findAllRequest({ uid });
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const postRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).send({ error: "isn`t Login" });
    const { from, to } = req.body;
    const toValidation = await validationTeamAndUser(to);
    if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
    await addRequest({ from, to });
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
    if (!req.user) return res.send({ error: "isn`t login" });
    const { from, to } = req.body;
    const toValidation = await validationTeamAndUser(to);
    if (!toValidation) return res.status(401).send({ error: "to isn`t exist" });
    _acceptRequest({ from, to });
    return res.status(200).send(true);
  } catch (error) {
    return next(error);
  }
};
