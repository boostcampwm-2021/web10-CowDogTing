import * as express from "express";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as cors from "cors";
import apiRouter from "./api";
import passportConfig from "./passport";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const app: express.Application = express();
passportConfig();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
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
  }),
);
app.use(express.static("src/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use("/api", apiRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.error = err;
});

export default app;
