import { Router } from "express";
import { getRequest, postRequest, denyRequest, acceptRequest } from "./controller";
const requestRouter = Router();

requestRouter.get("/", getRequest);
requestRouter.post("/post", postRequest);
requestRouter.post("/deny", denyRequest);
requestRouter.post("/accept", acceptRequest);

export default requestRouter;
