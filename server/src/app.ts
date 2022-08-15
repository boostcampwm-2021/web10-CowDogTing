import * as express from "express";
import * as dotenv from "dotenv";
import "./declare";
import { loadApp } from "./loaders";
import passportConfig from "./passport";
// import { migrationAllTable } from "./db/migrations/createTableAll";

dotenv.config();
passportConfig();
// migrationAllTable();

export const createApp = () => {
  const app = express();
  loadApp(app);
  return app;
};
