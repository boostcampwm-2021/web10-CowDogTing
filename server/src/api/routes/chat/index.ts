import { Router } from "express";
const chatRouter = Router();

chatRouter.get("/info");
chatRouter.get("/messages");

export default chatRouter;
