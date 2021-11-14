import { Request, Response } from "express";

export const isUser = (check: Express.User | undefined, res: Response) => {
  if (!check) {
    res.status(401).send({ error: "로그인을 하지 않았습니다" });
    return;
  }
};
