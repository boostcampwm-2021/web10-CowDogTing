import { NextFunction, Request, Response } from "express";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).send({ error: "로그인을 하지 않았습니다" });
    return;
  } else {
    next();
  }
};
