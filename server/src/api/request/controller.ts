import { NextFunction, Request, Response } from "express";
import { findAllRequest, validationTeamAndUser, findAllTeamRequest, isLeader, addRequest, sendRequest, _denyRequest, _acceptRequest } from "./service";

const defaultRequest = <any>[];

export const getRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.send(defaultRequest);
    const uid = String(req.user.uid);
    const gid = Number(req.user.gid);
    let userData = await findAllRequest({ uid });
    if (await isLeader({ uid, gid })) {
      const data = await findAllTeamRequest({ uid, gid, userData });
      return res.send(data);
    }
    return res.send(userData);
  } catch (error) {
    return next(error);
  }
};

export const postRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(402).send({ error: "isn`t Login" });
    const { from, to } = req.body;
    console.log(from, to);
    const toValidation = await validationTeamAndUser(to);
    if (!toValidation) return res.status(403).send({ error: "to isn`t exist" });
    await addRequest({ from, to });
    sendRequest({ from, to });
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
