import * as express from "express";
import * as dotenv from "dotenv";
import "./declare";
import { loadApp } from "./loaders";
import passportConfig from "./passport";

dotenv.config();
passportConfig();

export const createApp = () => {
  const app = express();
  loadApp(app);
  return app;
};
