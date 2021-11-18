import * as express from "express";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as cors from "cors";
import "./declare";
import apiRouter from "./api";
import passportConfig from "./passport";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const app = express();
passportConfig();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: String(process.env.COOKIE_SECRET),
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  res.locals.error = err;
});

export default app;
