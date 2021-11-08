import { Router } from "express";
const teamRouter = Router();

teamRouter.get("/info");
teamRouter.post("/invite");
teamRouter.post("/update");
teamRouter.post("/create");
export default teamRouter;
