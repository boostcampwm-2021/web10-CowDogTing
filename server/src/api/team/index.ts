import { Router } from "express";
import { createTeam, getTeamInfo, inviteTeam, updateTeam } from "./controller";

const teamRouter = Router();
teamRouter.get("/info", getTeamInfo);
teamRouter.post("/invite", inviteTeam);
teamRouter.post("/update", updateTeam);
teamRouter.post("/create", createTeam);
export default teamRouter;
