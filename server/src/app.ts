import * as express from "express";
import * as dotenv from "dotenv";
import "./declare";
import { loadApp } from "./loaders";
import passportConfig from "./passport";

dotenv.config();
passportConfig();

export const app = express();

export const createApp = () => {
  loadApp(app);
  return app;
};
