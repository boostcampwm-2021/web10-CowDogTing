import { NextFunction, Request, Response } from "express";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  // if(!req.User){}
  next();
};
