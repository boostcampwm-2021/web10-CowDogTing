import { Router } from "express";
import { createTeam, getTeamInfo, inviteTeam, updateTeam, exitTeam } from "./controller";

const teamRouter = Router();
teamRouter.get("/info", getTeamInfo);
teamRouter.post("/invite", inviteTeam);
teamRouter.post("/update", updateTeam);
teamRouter.post("/create", createTeam);
teamRouter.post("/exit", exitTeam);
export default teamRouter;
