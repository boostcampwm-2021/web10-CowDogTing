import { Router } from "express";
import { getRequest, postRequest, denyRequest, acceptRequest } from "./controller";
const requestRouter = Router();

requestRouter.get("/request", getRequest);
requestRouter.post("/postRequest", postRequest);
requestRouter.post("/denyRequest", denyRequest);
requestRouter.post("/acceptRequest", acceptRequest);

export default requestRouter;
