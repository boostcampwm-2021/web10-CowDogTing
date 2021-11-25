import * as express from "express";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as morgan from "morgan";
import "./declare";
import { loadApp } from "./loaders";
import passportConfig from "./passport";
import path = require("path");

dotenv.config();
passportConfig();

export const createApp = () => {
  const app = express();
  loadApp(app);
  return app;
};
